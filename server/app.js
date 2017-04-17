'use strict';
const { userSentAnswer, getUserData, resetUser } = require('./users/userStorage');
const { handleMsg } = require('./messages/messageHandler');
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

const getSpecificFood = (category, progress) => {
  console.log('From getSpecificFood progress', progress);
  console.log('From getSpecificFood category', category);
  return getRandomItem(category[progress]);
};

const foodCategoryNumber = getRandomItem(food.food);
/**
 * @param {object} data
 */
// let category = getRandomQuestion(questions.questions.level1);
bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  // console.log(foodCategoryNumber);
  console.log('*'.repeat(40));
  /* { type: 'message',
  channel: 'D4D542SQY',
  user: 'U47CB0C85',
  text: '<@U4DRJ6YLA> BOT NOT WORKING. DEBUG TIME FRIENDS',
  ts: '1488720842.000011',
  team: 'T47G4GJUW' } */

  if (isValidMsg(data.type, data.content)) {
    const user = findUser(data.subtitle, data.content);
    const userData = getUserData(user);
    const processedAnswer = handleMsg(data.content);
    const userStuff = userSentAnswer(user, processedAnswer);
    // need to send in category of food to user storage.
    console.log('processedAnswer', processedAnswer);
    let message = '';

    if (userData === void 0) {
      console.log('userSentAnswer is \n');
      message = foodCategoryNumber[userStuff.answer];
    } else {
      if (processedAnswer === 'y' || processedAnswer === 'n') {
        console.log('userSentAnswer is in yes or no\n');
        console.log('Userstuff answer', userStuff.answer);
        console.log('Userstuff constructor', foodCategoryNumber[userStuff.answer]);
        if (foodCategoryNumber[userStuff.answer].constructor === Array) {
          message = `<${getSpecificFood(foodCategoryNumber, userStuff.answer).recipegif}|${getSpecificFood(foodCategoryNumber, userStuff.answer).dishname}>`;
          resetUser(user);

        } else {
          message = foodCategoryNumber[userStuff.answer];
        }
      } else {
        message = `${processedAnswer}, please answer with yes or no.`;
      }
    }
    bot.postMessage(
      data.channel,
      `<@${user}> ${message}`,
      params
    );
  }
});
