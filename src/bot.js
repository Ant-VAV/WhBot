'use strict';
const Telegraf = require('telegraf');
const tips = require('./tips.js').tips;
// const config = require('../config/config');

const bot = new Telegraf(process.env.TOKEN);

// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('modern', ({reply}) => reply('Yo'));
// bot.command('hipster', Telegraf.reply('λ'));
// bot.launch();

bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears('help', (ctx) => ctx.reply(tips[Math.random() * tips.length]));
bot.launch();