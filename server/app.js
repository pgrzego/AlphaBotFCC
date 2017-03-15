'use strict';
const { userSentAnswer, getUserData } = require('./users/userStorage');
const data = require('../data/questions.json');

var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: process.env.SLACK_NAME
});


var params = {
  icon_emoji: ':lion_face:'
};


bot.on('start', function() {
  //bot.postMessageToChannel(process.env.SLACK_CHANNEL_NAME, 'meow!', params);
});

/**
 * helper fns
 * @param {object} msg
 */
const isValidMsg = (type, content) =>
  type === 'desktop_notification' && /@alphabot/.test(content);

// slack shows IM users somewhat differently (subtitle)
const findUser = (subtitle, content) => {
  const maybeUser = content.match(/(^.*?): /);
  return maybeUser ? maybeUser[1] : subtitle;
};

/**
 * @param {object} data
 */

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    console.log(data);
    console.log('*'.repeat(40));

  /*{ type: 'message',
  channel: 'D4D542SQY',
  user: 'U47CB0C85',
  text: '<@U4DRJ6YLA> BOT NOT WORKING. DEBUG TIME FRIENDS',
  ts: '1488720842.000011',
  team: 'T47G4GJUW' }*/

  if(isValidMsg(data.type, data.content)) {
    const user = findUser(data.subtitle, data.content);
    userSentAnswer(user);
    const progress = getUserData(user);

    bot.postMessage(
      data.channel,
      `<@${user}> you have contacted me in the past half a minute. This is ${progress === 1 ? 'one time' : progress + ' times'} in a row so far.`,
      params
    );
  }
});
