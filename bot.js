var TelegramBot = require('node-telegram-bot-api');
var unirest = require('unirest');
var token = 'your-telegram-api-key';
// Setup Polling
var bot = new TelegramBot(token, {polling: true});
var jsonContent = "error";

// Matches /quote
bot.onText(/\/quote/, function (msg, match) {
  var fromId = msg.from.id;
  unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous")
    .header("X-Mashape-Key", "mashape-key-goes-here")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
      jsonContent = JSON.parse(result.body);
      var resp = "\"" + jsonContent.quote + "\"" + " - " + jsonContent.author;
      bot.sendMessage(fromId, resp);
    });
});
