import json
import logging
import asyncio
from telegram import Update
from telegram.ext import Application, MessageHandler, filters, CallbackContext
import nest_asyncio
from groq import Groq

nest_asyncio.apply()

with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)

TELEGRAM_TOKEN = config_data['bot_token']
API_TOKEN = config_data['api_key']


logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def handle_message(update: Update, context: CallbackContext) -> None:
    user_message = update.message.text
    chat_id = update.message.chat_id

    logger.info(f"Received message: {user_message}")

    try:
        client = Groq(api_key=API_TOKEN,)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_message,
                }
            ],
            model="llama3-8b-8192",
        )
        answer = chat_completion.choices[0].message.content

        await context.bot.send_message(chat_id=chat_id, text=answer)
    except Exception as e:
        logger.error(f"Error processing message: {e}")

async def main() -> None:
    # Налаштування Application
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    # Додаємо обробники
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Запуск бота
    await application.run_polling()

if __name__ == '__main__':
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # Для вже активного циклу подій
            asyncio.ensure_future(main())
            loop.run_forever()
        else:
            # Для нового циклу подій
            loop.run_until_complete(main())
    except RuntimeError as e:
        print(f"RuntimeError: {e}")
