import os
import uuid
from fastapi import APIRouter, FastAPI, WebSocket,  Request, BackgroundTasks, HTTPException,Depends,WebSocketDisconnect,status
from fastapi.responses import JSONResponse
from ...redis.config import Redis
from ...socket.utils import get_token
from ...schema.user import User,Login,Token
from .hashing import Hash
from .jwttoken import create_access_token
from .oauth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
import json


redis = Redis()
app = APIRouter() 


#Create new chat session
redis_client = redis.create_rejson_connection()


@app.get("/")
def read_root(current_user:User = Depends(get_current_user)):
	return {"data":"Hello OWrld"}

@app.post('/register')
def create_user(request:User):
	hashed_pass = Hash.bcrypt(request.password)
	user_id = str(uuid.uuid4())
	user_key = f'user:{user_id}'
	user_data = {
        "username": request.username,
        "password": hashed_pass
    }
	user_json = json.dumps(user_data)
	redis_client.set(user_key, user_json)
	print(user_data)
	return {"res":"created"}

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
	# Retrieve user data from Redis
    user_key = f'username:{request.username}'
    user_json = redis_client.get(user_key)

    if not user_json:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'No user found with this {request.username} username')

    user_data = json.loads(user_json)

    if not Hash.verify(user_data["password"], request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Wrong Username or password')

    # If login is successful, create an access token
    access_token = create_access_token(data={"sub": user_data["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
	