# Use official Python image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy project files into container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir flask flask-cors requests python-dotenv flask-bcrypt pyjwt

# Expose Flask port
EXPOSE 5000

# Start backend server
CMD ["python", "app.py"]
