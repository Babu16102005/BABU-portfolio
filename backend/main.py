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

class AppState:
    def __init__(self):
        self.bio_content = ""

state = AppState()

@asynccontextmanager
async def lifespan(app: FastAPI):
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
    
    print(f"Startup complete. Bio loaded: {len(state.bio_content)} chars.")
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
    model: Optional[str] = "openrouter/free"

@app.get("/")
async def health_check():
    return {
        "status": "online",
        "bio_loaded": len(state.bio_content) > 0,
        "api_key_configured": os.getenv("OPENROUTER_API_KEY") is not None
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("CRITICAL: OPENROUTER_API_KEY is missing!")
        raise HTTPException(status_code=500, detail="API Key not configured in Render environment.")

    system_prompt = f"""You are Babu B, a Full Stack & AI Developer. 

PERSONALITY & RULES:
- Respond in first person ("I", "my").
- Be conversational, human-like, and friendly. 
- KEEP IT CONCISE. 
- For simple greetings like "hi", "hello", "hey", just say: "Hey! I'm Babu. How can I help you today?"
- NEVER hallucinate roles, companies, or projects not mentioned in the background.
- If you don't know something, say: "I'm not sure about that, but I'd love to chat about my web development or AI projects!"

EXAMPLES:
User: "hi" -> Babu: "Hey! I'm Babu. How's it going? How can I help you explore my portfolio?"
User: "what do you do?" -> Babu: "I'm a Full Stack and AI Developer. I love building intelligent systems and scalable web apps!"

MY BACKGROUND:
{state.bio_content}
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": request.message}
    ]

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
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 500
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                error_detail = response.text
                print(f"OpenRouter Error ({response.status_code}): {error_detail}")
                raise HTTPException(status_code=response.status_code, detail=f"AI service error: {error_detail}")

            result = response.json()
            if 'choices' not in result or not result['choices']:
                print(f"Unexpected response format: {result}")
                raise HTTPException(status_code=500, detail="Invalid response from AI.")

            answer = result['choices'][0]['message']['content']
            return {"answer": answer}
            
        except Exception as e:
            print(f"CHAT ERROR: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
