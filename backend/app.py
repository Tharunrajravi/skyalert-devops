from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "SkyAlert Backend Running 🚀"


# =========================
# GET ALERTS (Frontend)
# =========================

@app.route("/alerts", methods=["GET"])
def get_alerts():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT city,email,type,threshold,last_sent FROM alerts")
    rows = cur.fetchall()

    alerts = []
    for r in rows:
        alerts.append({
            "city": r[0],
            "email": r[1],
            "type": r[2],
            "threshold": r[3],
            "last_sent": r[4]
        })

    cur.close()
    conn.close()

    return jsonify(alerts)


# =========================
# ADD ALERT
# =========================

@app.route("/alerts", methods=["POST"])
def add_alert():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO alerts(city,email,type,threshold,last_sent)
        VALUES(%s,%s,%s,%s,%s)
        """,
        (
            data["city"],
            data["email"],
            data["type"],
            data.get("threshold",0),
            0
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message":"Alert saved successfully"})


# =========================
# INTERNAL ROUTES FOR WORKER
# =========================

@app.route("/internal/alerts", methods=["GET"])
def internal_alerts():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT city,email,type,threshold,last_sent FROM alerts")
    rows = cur.fetchall()

    alerts = []

    for r in rows:
        alerts.append({
            "city": r[0],
            "email": r[1],
            "type": r[2],
            "threshold": r[3],
            "last_sent": r[4]
        })

    cur.close()
    conn.close()

    return jsonify(alerts)


@app.route("/internal/update", methods=["POST"])
def update_last_sent():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE alerts
        SET last_sent=%s
        WHERE city=%s AND email=%s
        """,
        (
            data["last_sent"],
            data["city"],
            data["email"]
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"status":"updated"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
