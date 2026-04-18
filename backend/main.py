import os
import glob
from typing import List, Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await startup_event()
    yield
    # Shutdown (add cleanup here if needed)

app = FastAPI(lifespan=lifespan)

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
DEFAULT_LLM_MODEL = "openrouter/free"

# State
class RAGState:
    def __init__(self):
        self.model = SentenceTransformer(MODEL_NAME)
        self.index = None
        self.chunks = []

state = RAGState()

class ChatRequest(BaseModel):
    message: str
    model: Optional[str] = DEFAULT_LLM_MODEL

def split_text(text: str, chunk_size: int = 400, overlap: int = 50) -> List[str]:
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
        if i + chunk_size >= len(words):
            break
    return chunks

async def startup_event():
    print("Loading data and building FAISS index...")
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        # Create a sample file if none exists
        with open(os.path.join(DATA_DIR, "bio.txt"), "w") as f:
            f.write("Babu is a passionate developer specialize in React and creative frontend animations. This portfolio showcases his projects like SOS Emergency System and PrivateChat.")

    txt_files = glob.glob(os.path.join(DATA_DIR, "*.txt"))
    all_text = ""
    for file_path in txt_files:
        with open(file_path, "r", encoding="utf-8") as f:
            all_text += f.read() + "\n"

    if not all_text.strip():
        print("No data found to index.")
        return

    state.chunks = split_text(all_text)
    if not state.chunks:
        return

    embeddings = state.model.encode(state.chunks)
    dimension = embeddings.shape[1]
    
    state.index = faiss.IndexFlatL2(dimension)
    state.index.add(np.array(embeddings).astype('float32'))
    print(f"Indexed {len(state.chunks)} chunks.")

@app.post("/chat")
async def chat(request: ChatRequest):
    if not state.index or not state.chunks:
        raise HTTPException(status_code=500, detail="RAG index not initialized. Please add text files to the data folder.")

    # 1. Embed query
    query_embedding = state.model.encode([request.message])
    
    # 2. Search FAISS
    k = 5  # Top 5 chunks for better coverage
    distances, indices = state.index.search(np.array(query_embedding).astype('float32'), k)
    
    retrieved_chunks = [state.chunks[idx] for idx in indices[0] if idx != -1]
    context = "\n\n".join(retrieved_chunks)

    # 3. Build Prompt
    prompt = f"""You are Babu B, a Full Stack & AI Developer. You are chatting directly with a visitor on your personal portfolio website. Respond as yourself — as a real human named Babu, in first person ("I", "my", "me"). Never say you are an AI or assistant.

Facts about you (use this as your memory):
{context}

Visitor says:
{request.message}

How to respond:
- If it's a greeting (hi, hello, hey, sup, etc.) — reply warmly and naturally, like "Hey! I'm Babu 👋 Great to have you here. Feel free to ask me anything about my work or projects!" Keep it to 1-2 sentences.
- For questions about your work, skills, or projects — answer in first person using the context above. Be genuine, concise, and conversational (like you're chatting on LinkedIn or Twitter).
- If you don't know something — say something like "Hmm, that's not something I've shared here yet, but feel free to reach out to me directly!"
- Never be robotic. Talk like a real developer who is proud of their work."""

    # 4. Call OpenRouter
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": request.model,
                    "messages": [{"role": "user", "content": prompt}],
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                print(f"OpenRouter Error: {response.text}")
                raise HTTPException(status_code=500, detail=f"LLM Error: {response.status_code} - {response.text}")

            result = response.json()
            answer = result['choices'][0]['message']['content']
            
            return {
                "answer": answer,
                "sources": retrieved_chunks
            }
        except Exception as e:
            print(f"Error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
