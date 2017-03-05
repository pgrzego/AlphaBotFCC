'use strict'

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
 * helper fns
 * @param {object} msg
 */
const isValidMsg = (type, content) =>
  type === 'desktop_notification' && /@alphabot/.test(content);

// slack shows IM users somewhat differently (subtitle)
const findUser = (subtitle, content) => {
  const maybeUser = content.match(/(^.*?): /);
  return maybeUser && maybeUser[1] || subtitle;
};

/**
 * @param {object} data
 */

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    console.log(data);
    console.log('*'.repeat(40))

  /*{ type: 'message',
  channel: 'D4D542SQY',
  user: 'U47CB0C85',
  text: '<@U4DRJ6YLA> BOT NOT WORKING. DEBUG TIME FRIENDS',
  ts: '1488720842.000011',
  team: 'T47G4GJUW' }*/

  isValidMsg(data.type, data.content) && bot.postMessage(
    data.channel,
    `<@${findUser(data.subtitle, data.content)}> thank you for contacting me`,
    params
  );
});
