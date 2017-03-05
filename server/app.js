'use strict'

require('dotenv').config()

var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: process.env.SLACK_NAME
})


var params = {
  icon_emoji: ':lion_face:'
};


bot.on('start', function() {
  //bot.postMessageToChannel(process.env.SLACK_CHANNEL_NAME, 'meow!', params);
})

/**
 * @param {object} data 
 */
bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 
    console.log(data);

    /*{ type: 'message',
  channel: 'D4D542SQY',
  user: 'U47CB0C85',
  text: '<@U4DRJ6YLA> BOT NOT WORKING. DEBUG TIME FRIENDS',
  ts: '1488720842.000011',
  team: 'T47G4GJUW' }*/

  if (!data.username || data.username !== 'alphabot') {
    bot.postMessage(data.channel, `<@${data.user}> thank you for contacting me`, params);
  }
  
});