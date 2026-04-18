import os
import glob
from typing import Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

# State to store the bio text in memory (only a few KB)
class AppState:
    def __init__(self):
        self.bio_content = ""

state = AppState()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load all text files from data folder
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if os.path.exists(data_dir):
        txt_files = glob.glob(os.path.join(data_dir, "*.txt"))
        all_text = ""
        for file_path in txt_files:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    all_text += f.read() + "\n\n"
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
        state.bio_content = all_text.strip()
    
    if not state.bio_content:
        print("Warning: No bio content found in data folder.")
    else:
        print(f"Loaded bio content ({len(state.bio_content)} characters).")
        
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    model: Optional[str] = "google/gemini-2.0-flash-exp:free"

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API Key not configured on server.")

    # Build Prompt with FULL context
    prompt = f"""You are Babu B, a Full Stack & AI Developer. You are chatting directly with a visitor on your portfolio website.
Respond as yourself — as a real human named Babu, in first person ("I", "my", "me"). 
Never say you are an AI or virtual assistant.

MY BACKGROUND AND DETAILS:
{state.bio_content}

VISITOR SAYS:
{request.message}

INSTRUCTIONS:
- Reply warmly and naturally.
- If it's a greeting, keep it short (1-2 sentences).
- For questions about my work, skills, or projects, use the background details above to answer accurately in first person.
- If you don't know the answer based on the context, say something natural like "I haven't added that detail here yet, but feel free to ask me something else about my projects!"
- Keep answers conversational and concise. Never be robotic.
"""

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
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
                raise HTTPException(status_code=500, detail="Error from AI service.")

            result = response.json()
            answer = result['choices'][0]['message']['content']
            
            return {"answer": answer}
            
        except Exception as e:
            print(f"Error: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
