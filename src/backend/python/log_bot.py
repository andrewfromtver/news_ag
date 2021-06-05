import logging
import sys
import app_config
import telebot
import datetime
from telebot import types

level = logging.INFO
FORMAT = '%(asctime)s %(levelname)s: %(message)s'
logfile = '/log_bot.log'
logging.basicConfig(format = FORMAT, level=level, filename = logfile )
logger = logging.getLogger(__name__)
debug = logger.debug
print = logger.info

bot = telebot.TeleBot(app_config.telegram_bot_token)
keyboard = types.ReplyKeyboardMarkup()

keyboard.row('Weather API', 'Currency API', 'Address API')
keyboard.row('Translate API', 'API engine', 'Telegram API')
keyboard.row('NGINX access log 🌎')
keyboard.row('NGINX error log 🌎')


@bot.message_handler(commands=['start'])
def start_message(message):
    print('New user: ' +
            '{"username": "' + str(message.from_user.username) +
            '", "id": ' + str(message.from_user.id) +
            ', "first_name": "' + str(message.from_user.first_name) + '", "last_name": "' + str(message.from_user.last_name) + '"}')
    bot.send_sticker(message.chat.id,
                     'CAACAgUAAxkBAAIDE1448lrMpAvcNM-Qqjq50hVuDTtGAAKAAwAC6QrIA5dYbzvjPsr4GAQ')
    bot.send_message(message.chat.id,
                     'News-AG log bot',
                     reply_markup=keyboard)

@bot.message_handler(commands=['help'])
def help_message(message):
    bot.send_message(message.chat.id,
                     'Bot can fetch log files from News-AG production server')

@bot.message_handler(content_types=['text'])
def log_message(message):
    if message.from_user.username == app_config.username and message.from_user.id == app_config.userid:
        try:
            if message.text == 'Telegram API':
                doc = open('/telegram_api.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
                doc = open('/log_bot.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'API engine':
                doc = open('/api_engine.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'Weather API':
                doc = open('/weather_forecast_api.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'Currency API':
                doc = open('/currency_api.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'Translate API':
                doc = open('/translate_api.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'Address API':
                doc = open('/address_api.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'NGINX access log 🌎':
                doc = open('/var/log/nginx/access.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
            elif message.text == 'NGINX error log 🌎':
                doc = open('/var/log/nginx/error.log','rb')
                bot.send_document(message.chat.id, doc)
                doc.close()
        except:
            bot.send_sticker(message.chat.id,
                 'CAACAgIAAxkBAAFOWSVgu7FXRkNsTkAvuAslhe1gncLaVwACGgADtB8uBQmRkgAB0_zKyx8E')
    else:
        bot.send_message(message.chat.id, 'Access denied ...')
        print('Access denied for user: ' +
            '{"username": "' + str(message.from_user.username) +
            '", "id": ' + str(message.from_user.id) +
            ', "first_name": "' + str(message.from_user.first_name) + '", "last_name": "' + str(message.from_user.last_name) + '"}')

while True:
    try:
        bot.polling(none_stop=True)
    except Exception as e:
        print(e)
        time.sleep(15)
