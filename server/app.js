'use strict';
const { userSentAnswer, getUserData } = require('./users/userStorage');
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
  return {
    meal_category: food.food[category],
    progress: getRandomItem(food.food[category][progress])
  };
};

/**
 * @param {object} data
 */
// let category = getRandomQuestion(questions.questions.level1);
const foodCategory = getRandomItem(food.food);

bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  // console.log(data.content);
  console.log(foodCategory.category);
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
    console.log('userData inside botmessage', userData);
    const processedAnswer = handleMsg(data.content);
    // need to send in category of food to user storage.
    console.log('processedAnswer', processedAnswer);
    // Need to put in a check that processedAnswer is either 'y' or 'n' otherwise it needs to ask for yes or no answer.
    let message = '';

    if (userData.progress > 1) {
      message = foodCategory;
      console.log(message);
    } else {
      if (processedAnswer === 'y' || processedAnswer === 'n') {
        userSentAnswer(user, processedAnswer);
      } else {
        message = `${processedAnswer}, please answer with yes or no.`;
      }
    }
    console.log('userData after user sent answer', userData);
    console.log(userData.answer);

    bot.postMessage(
      data.channel,
      `<@${user}> ${message}`,
      params
    );
  }
});
