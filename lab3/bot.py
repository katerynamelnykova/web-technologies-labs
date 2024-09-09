import json
import logging
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, MessageHandler, filters, CallbackContext, CallbackQueryHandler
import nest_asyncio
from groq import Groq

nest_asyncio.apply()

with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)

TELEGRAM_TOKEN = config_data['bot_token']
API_TOKEN = config_data['api_key']
HANDLER_ACTIVE = False

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

def start_keyboard():
    keyboard = [
        [InlineKeyboardButton("Студент", callback_data='info1')],
        [InlineKeyboardButton("IT-технології", callback_data='info2')],
        [InlineKeyboardButton("Контакти", callback_data='info3')],
        [InlineKeyboardButton("Поговорити з Groq", callback_data='start_handler')]
    ]
    return InlineKeyboardMarkup(keyboard)

def back_keyboard():
    keyboard = [
        [InlineKeyboardButton("Назад", callback_data='back')]
    ]
    return InlineKeyboardMarkup(keyboard)

async def start(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id
    await context.bot.send_message(chat_id=chat_id, text="Вітаю! Оберіть команду: ", reply_markup=start_keyboard())

async def button(update: Update, context: CallbackContext) -> None:
    global HANDLER_ACTIVE
    query = update.callback_query
    await query.answer()

    data = query.data

    if data == 'info1':
        await query.message.edit_text("ст. Мельникова К.О. гр. ІС-12", reply_markup=back_keyboard())
    elif data == 'info2':
        await query.message.edit_text("IT-технології: Front-End, Back-end", reply_markup=back_keyboard())
    elif data == 'info3':
        await query.message.edit_text("Контакти: тел. 095-905-1929, email: kate.meln2803@gmail.com", reply_markup=back_keyboard())
    elif data == 'start_handler':
        HANDLER_ACTIVE = True
        await query.message.edit_text("Тепер ви можете спитити щось у Groq: ", reply_markup=back_keyboard())
    elif data == 'back':
        if HANDLER_ACTIVE:
            HANDLER_ACTIVE = False
        await query.message.edit_text("Вітаю! Оберіть команду: ", reply_markup=start_keyboard())

async def handle_message(update: Update, context: CallbackContext) -> None:
    chat_id = update.message.chat_id

    if HANDLER_ACTIVE:
        user_message = update.message.text
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

            await context.bot.send_message(chat_id=chat_id, text=answer, reply_markup=back_keyboard())
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            await context.bot.send_message(chat_id=chat_id, text="На жаль, сталася помилка. Спробуйте ще раз.", reply_markup=start_keyboard())
    else:
        await context.bot.send_message(chat_id=chat_id, text="Будь ласка, оберіть команду з меню: ", reply_markup=start_keyboard())

async def main() -> None:
    global application
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_handler(MessageHandler(filters.COMMAND, start))
    application.add_handler(CallbackQueryHandler(button))

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
