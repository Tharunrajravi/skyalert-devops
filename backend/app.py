from flask import Flask, request, jsonify
from flask_cors import CORS
import time

# Existing alerts storage
alerts = []

# Auth imports
from users_db import users
from auth_service import hash_password, check_password, generate_token

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "SkyAlert Backend Running 🚀"


# =========================
# 🔐 AUTH ROUTES
# =========================

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    # Check if user already exists
    for user in users:
        if user["email"] == email:
            return jsonify({"message": "User already exists"}), 400

    users.append({
        "email": email,
        "password": hash_password(password)
    })

    return jsonify({"message": "User created successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    for user in users:
        if user["email"] == email and check_password(user["password"], password):
            token = generate_token(email)
            return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401


# =========================
# 🌦 ALERT ROUTES
# =========================

@app.route("/alerts", methods=["GET"])
def get_alerts():
    return jsonify(alerts)


@app.route("/alerts", methods=["POST"])
def add_alert():
    data = request.json

    alert = {
        "city": data["city"],
        "email": data["email"],
        "type": data["type"],          # rain OR temp
        "threshold": data.get("threshold"),
        "last_sent": 0                # cooldown tracking
    }

    alerts.append(alert)

    return jsonify({
        "message": "Alert added successfully",
        "alert": alert
    }), 201


# =========================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
