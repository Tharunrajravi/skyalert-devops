import boto3
import os

sns = boto3.client(
    "sns",
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_KEY")
)

TOPIC_ARN = os.getenv("SNS_TOPIC_ARN")

def send_email(email, city, alert_type, threshold=None):

    if alert_type == "rain":
        message = f"Rain expected in {city}. Take precautions."
        subject = "SkyAlert Rain Alert"

    else:
        message = f"Temperature above {threshold}°C detected in {city}."
        subject = "SkyAlert Temperature Alert"

    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Message=message,
        Subject=subject
    )

    print("SNS Notification sent:", response)
