from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DB_FILE = "alerts.json"

# =========================
# DATABASE HELPERS
# =========================

def load_alerts():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_alerts(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)


# =========================
# ROUTES
# =========================

@app.route("/")
def home():
    return "SkyAlert Backend Running 🚀"


# Get alerts (for frontend)
@app.route("/alerts", methods=["GET"])
def get_alerts():
    return jsonify(load_alerts())


# Add alert (from frontend)
@app.route("/alerts", methods=["POST"])
def add_alert():
    data = request.json
    alerts = load_alerts()

    new_alert = {
        "city": data["city"],
        "email": data["email"],
        "type": data["type"],
        "threshold": data.get("threshold", 0),
        "last_sent": 0
    }

    alerts.append(new_alert)
    save_alerts(alerts)

    return jsonify({"message": "Alert saved successfully"}), 201


# Internal route for worker to fetch alerts
@app.route("/internal/alerts", methods=["GET"])
def internal_get_alerts():
    return jsonify(load_alerts())


# Worker updates last_sent
@app.route("/internal/update", methods=["POST"])
def update_last_sent():
    data = request.json
    city = data["city"]
    email = data["email"]
    last_sent = data["last_sent"]

    alerts = load_alerts()

    for alert in alerts:
        if alert["city"] == city and alert["email"] == email:
            alert["last_sent"] = last_sent

    save_alerts(alerts)
    return jsonify({"status": "updated"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
