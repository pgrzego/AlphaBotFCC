'use strict';
const { userSentAnswer, getUserData } = require('./users/userStorage');
const food = require('../data/test.json');

var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN || 'xoxb-156540927524-IMimE35LxND4m2Q3zo3C07GA',
  name: 'alphabot'
});

var params = {
  icon_emoji: ':lion_face:'
};

bot.on('start', function() {
  // bot.postMessageToChannel('testing', 'meow!', params);
  // console.log(food.food[0].category);
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

const getRandomItem = (itemList) => {
  const randomItem = itemList[Math.floor(Math.random() * itemList.length)];
  return randomItem;
};

/**
 * @param {object} data
 */
// let category = getRandomQuestion(questions.questions.level1);
let category = getRandomItem(food.food);

bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  console.log(data);
  console.log('*'.repeat(40));
  console.log(category.category);
  /* { type: 'message',
  channel: 'D4D542SQY',
  user: 'U47CB0C85',
  text: '<@U4DRJ6YLA> BOT NOT WORKING. DEBUG TIME FRIENDS',
  ts: '1488720842.000011',
  team: 'T47G4GJUW' } */

  if (isValidMsg(data.type, data.content)) {
    const user = findUser(data.subtitle, data.content);
    userSentAnswer(user, category.q, 'followUpYes');
    const userData = getUserData(user);
    // const answer = userData.answer === 'yes' ? 'followUpYes' : 'followUpNo';

    // switch (userData.progress) {
    //   case 2:
    //     category = category[userData.answer];
    //     break;
    //   case 3:
    //     category = category[userData.answer];
    //     break;
    //   default:
    //     category = questions.questions.level1;
    // }

    bot.postMessage(
      data.channel,
      `<@${user}> you have contacted me in the past half a minute. 
      ${userData.progress === 1 ? `${category.q}` : `ho`}`,
      params
    );
  }
});
