import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def send_email(to_email, city, alert_type, threshold=None):
    msg = EmailMessage()

    # Dynamic templates
    if alert_type == "rain":
        subject = f"🌧 Rain Alert for {city}"
        body = f"Rain expected soon in {city}. Take umbrella ☔"

    elif alert_type == "temp":
        subject = f"🌡 Temperature Alert for {city}"
        body = f"Temperature in {city} exceeded {threshold}°C. Stay hydrated 🥤"

    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg.set_content(body)

    # Gmail SMTP
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL_USER, EMAIL_PASS)
        smtp.send_message(msg)
