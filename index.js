const TOKEN = process.env.TELEGRAM_TOKEN || 'Paste your Token Here...'
const TelegramBot = require('node-telegram-bot-api')
const Gpio = require('onoff').Gpio
const sensorLib = require("node-dht-sensor")

let led = new Gpio(4, 'out') // GPIO4 (pin #7)
sensorLib.initialize(11, 27)

const options = {
    polling: true
}

const KEYBOARD = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['/on', '/off'],
            ['/temp', '/hum'],
            ['By Priya Patel', 'github.com/priya390']
        ]
    })
}

const bot = new TelegramBot(TOKEN, options)

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'You sent the /start command', KEYBOARD)
})

bot.onText(/\/on/, (msg) => {
    led.writeSync(1)
    bot.sendMessage(msg.chat.id, 'LED turned ON', KEYBOARD)
})

bot.onText(/\/off/, (msg) => {
     led.writeSync(0)
    bot.sendMessage(msg.chat.id, 'LED turned OFF', KEYBOARD)
})

bot.onText(/\/temp/, (msg) => {
    let temperature = sensorLib.read().temperature.toFixed(1) + "°C"
    bot.sendMessage(msg.chat.id, temperature, KEYBOARD)
})

bot.onText(/\/hum/, (msg) => {
    let humidity = sensorLib.read().humidity.toFixed(1) + "%"
    bot.sendMessage(msg.chat.id, humidity, KEYBOARD)
})

