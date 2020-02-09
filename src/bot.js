'use strict';
const Telegraf = require('telegraf');

const tip = require('./tips.js').getTip;
const strHelpers = require('./stringHelpers');
const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;

const bot = new Telegraf(process.env.TOKEN || config.BotToken);

bot0();
// botOne();
// botTwo();

function bot0() {
    bot.start((ctx) => ctx.reply('Welcome!'));
    bot.on('text', (ctx) => {
        let battle = battleCreator(ctx.message);
        if (!!battle) {
            // addBattleToDB(battle);
            return ctx.reply(strHelpers.sayBattleRequest(battle));
        }
    });

    bot.launch();
}

function botOne() {
    // getMongoReady();

    bot.start((ctx) => ctx.reply('Welcome!'));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on('sticker', (ctx) => ctx.reply('👍'));
    bot.hears(['help', 'Help'], (ctx) => ctx.reply(tip()));

    bot.launch();
}

function botTwo() {
    bot.command('oldschool', (ctx) => ctx.reply('Hello'));
    bot.command('modern', ({reply}) => reply('Yo'));
    bot.command('hipster', Telegraf.reply('λ'));
    bot.launch();
}

function addBattleToDB(battle) {
    const url = "mongodb://localhost:27017/";
    const mongoClient = new MongoClient(url, {useUnifiedTopology: true});

    mongoClient.connect(function(err, client) {
        const db = client.db("warhammer");
        const collection = db.collection("battles");
        collection.insertOne(battle, function(err, result) {

            if (err) {
                return console.log(err);
            }
            console.log(result.ops);
            client.close();
        });
    });
}

const battleCreator = (message) => {

    let battleRequest = strHelpers.getBattleRequest(message.text);
    if (typeof battleRequest === 'object') {
        let result = {};
        if (battleRequest.isAttack) {
            result.attackSide = [message.from.username];
        } else {
            result.defSide = [message.from.username];
        }
        result.hexNumber = battleRequest.hexNumber;

        return result;
    }
};