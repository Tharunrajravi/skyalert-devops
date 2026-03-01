import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    return requests.get(url).json()

def will_rain(city):
    data = get_weather(city)
    if "weather" not in data:
        return False
    weather = data["weather"][0]["main"].lower()
    return "rain" in weather or "drizzle" in weather

def temp_above(city, threshold):
    data = get_weather(city)
    if "main" not in data:
        return False
    temp = data["main"]["temp"]
    return temp > float(threshold)
