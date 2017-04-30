'use strict';
const {
  userSentAnswer,
  getUserData,
  resetUser,
  initializeUser
} = require('./users/userStorage');
const { handleMsg } = require('./messages/messageHandler');
const food = require('../data/questions.json');

var SlackBot = require('slackbots');

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: process.env.SLACK_NAME
});

var params = {
  icon_emoji: ':lion_face:'
};

bot.on('start', function() {
  // bot.postMessageToChannel('testing', 'meow!', params);
});

/**
 * helper fns
 * @param {object} msg
 */
const isValidMsg = (type, content) =>
  type === 'desktop_notification' && /@alphabot/.test(content);

const findUser = (subtitle, content) => {
  const maybeUser = content.match(/(^.*?): /);
  return maybeUser ? maybeUser[1] : subtitle;
};

const getRandomNum = itemList => {
  const randomItem = Math.floor(Math.random() * itemList.length);
  return randomItem;
}

const getNextNum = (num, itemList) => {
  return (num === itemList.length - 1) ? 0 : num + 1;
}

const getRecipe = (category, progress) => {
  return category[progress][getRandomNum(category[progress])];
};

/**
 * @param {object} data
 */
bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  console.log('*'.repeat(40));
  if (isValidMsg(data.type, data.content)) {
    const user = findUser(data.subtitle, data.content);
    const processedAnswer = handleMsg(data.content);
    const foodCategoryNumber = getRandomNum(food.food);
    const userData = getUserData(user)
      ? userSentAnswer(user, processedAnswer)
      : initializeUser(user, foodCategoryNumber);
    let message = '';
    if (userData.answer === 'q') {
      console.log(userData.answer);
      message = food.food[userData.foodCategory][userData.answer];
    } else {
      if (processedAnswer === 'y' || processedAnswer === 'n') {
        if (userData.answer === 'qn') {
          // Get the next category
          const nextCategory = getNextNum(userData.foodCategory, food.food);
          userData.answer = 'q';
          userData.foodCategory = nextCategory;
          // set the message to ask about the new category
          message = food.food[userData.foodCategory][userData.answer];
        } else if (food.food[userData.foodCategory][userData.answer].constructor === Array) {
          const recipe = getRecipe(food.food[userData.foodCategory], userData.answer);
          message = `<${recipe.recipegif}|${recipe.dishname}>`;
          resetUser(user);
        } else {
          message = food.food[userData.foodCategory][userData.answer];
        }
      } else {
        message = `${processedAnswer}, please answer with yes or no.`;
      }
    }
    bot.postMessage(data.channel, `<@${user}> ${message}`, params);
  }
});
