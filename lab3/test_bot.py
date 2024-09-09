from groq import Groq
import json

# Завантаження токенів з конфігурації
with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)

client = Groq(
    api_key=config_data['api_key'],
)

message = str(input("Your question: "))

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": message,
        }
    ],
    model="llama3-8b-8192",
)

print(chat_completion.choices[0].message.content)