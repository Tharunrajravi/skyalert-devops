import time
import requests
from weather_service import will_rain, temp_above
from email_service import send_email

# ✅ Use Kubernetes Service name
API_URL = "http://skyalert-backend-service:5000/internal/alerts"
UPDATE_URL = "http://skyalert-backend-service:5000/internal/update"

COOLDOWN = 3600  # 1 hour (change to 120 for testing)

print("🌦 Weather worker started...")

while True:
    print("🔎 Fetching alerts from backend...")

    try:
        res = requests.get(API_URL)
        alerts = res.json()
        current_time = time.time()

        for alert in alerts:
            city = alert["city"]
            email = alert["email"]
            alert_type = alert["type"]
            last_sent = alert.get("last_sent", 0)

            if current_time - last_sent < COOLDOWN:
                print(f"⏳ Cooldown active for {city}, skipping...")
                continue

            if alert_type == "rain":
                if will_rain(city):
                    print(f"☔ Rain detected in {city}, sending email...")
                    send_email(email, city, "rain")

                    requests.post(UPDATE_URL, json={
                        "city": city,
                        "email": email,
                        "last_sent": current_time
                    })

            elif alert_type == "temp":
                threshold = alert.get("threshold", 0)
                if temp_above(city, threshold):
                    print(f"🌡 Temp above {threshold}°C in {city}, sending email...")
                    send_email(email, city, "temp", threshold)

                    requests.post(UPDATE_URL, json={
                        "city": city,
                        "email": email,
                        "last_sent": current_time
                    })

    except Exception as e:
        print("❌ Worker error:", e)

    time.sleep(30)
