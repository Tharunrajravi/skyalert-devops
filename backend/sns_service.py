import boto3
import os

sns = boto3.client(
    "sns",
    region_name="ap-south-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_KEY")
)

TOPIC_ARN = os.getenv("SNS_TOPIC_ARN")


def send_alert(message):
    response = sns.publish(
        TopicArn=TOPIC_ARN,
        Message=message,
        Subject="SkyAlert Notification"
    )
    return response
