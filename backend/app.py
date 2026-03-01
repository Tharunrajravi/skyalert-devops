from flask import Flask, request, jsonify
from flask_cors import CORS

# In-memory storage
alerts = []

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "SkyAlert Backend Running 🚀"

# =========================
# 🌦 ALERT ROUTES
# =========================

@app.route("/alerts", methods=["GET"])
def get_alerts():
    return jsonify(alerts)

@app.route("/internal/alerts", methods=["GET"])
def internal_get_alerts():
    return jsonify(alerts)

@app.route("/alerts", methods=["POST"])
def add_alert():
    data = request.json
    alert = {
        "city": data["city"],
        "email": data["email"],
        "type": data["type"],
        "threshold": data.get("threshold"),
        "last_sent": 0
    }
    alerts.append(alert)
    return jsonify({"message": "Alert added"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
