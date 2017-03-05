'use strict'

require('dotenv').config()

var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: process.env.SLACK_NAME
})

bot.on('start', function() {
  var params = {
    icon_emoji: ':lion_face:'
  };

  bot.postMessageToChannel(process.env.SLACK_CHANNEL_NAME, 'meow!', params);
})