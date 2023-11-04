from fastapi import FastAPI, Request,Depends
import uvicorn
import os
from dotenv import load_dotenv
from src.routes.chat import chat
from fastapi.middleware.cors import CORSMiddleware
# from server.src.routes.authentication.auth import app

load_dotenv()

api = FastAPI()
# api.include_router(app)
api.include_router(chat)



origins = [
    "http://localhost",   # The address of your front-end app
    "http://localhost:3000",   # If your front-end is running on port 3000
]

# Add the CORS middleware
api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    # if os.environ.get('APP_ENV') == "development":
    uvicorn.run("main:api", host="0.0.0.0", port=3500,workers=4, reload=True)
    # else:
    #   pass
