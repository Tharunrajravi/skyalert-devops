import jwt
import time
import os
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
SECRET = "skyalert-secret-key"

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf-8")

def check_password(hashed, password):
    return bcrypt.check_password_hash(hashed, password)

def generate_token(email):
    payload = {
        "email": email,
        "exp": time.time() + 86400  # 1 day expiry
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def verify_token(token):
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except:
        return None
