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

const getRandomItem = itemList => {
  const randomItem = itemList[Math.floor(Math.random() * itemList.length)];
  return randomItem;
};
const getRandomNum = itemList => {
  const randomItem = Math.floor(Math.random() * itemList.length);
  return randomItem;
}

const getNextNum = (num, itemList) => {
  return (num === itemList.length - 1) ? 0 : num + 1;
}

const getSpecificFood = (category, progress) => {
  return getRandomItem(category[progress]);
};

/**
 * @param {object} data
 */
// let category = getRandomQuestion(questions.questions.level1);
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
    console.log('UserData', userData);
    let message = '';
    if (userData.progress === 1) {
      // message = userData.foodCategory[userData.answer];
      message = food.food[userData.foodCategory][userData.answer];
    } else {
      if (processedAnswer === 'y' || processedAnswer === 'n') {
        console.log('userSentAnswer is in yes or no\n');
        console.log('Userstuff answer', userData.answer);
        if (userData.answer === 'qn') {
          resetUser(user);
          const nextCategory = getNextNum(userData.foodCategory, food.food);
          console.log(nextCategory);
          initializeUser(user, nextCategory);
          // console.log(`Userdata from here`, initializeUser(user, nextCategory));
          userData.answer = 'q';
          console.log(`From inside 'qn'`, userData.answer);
          message = food.food[userData.foodCategory][userData.answer];
          console.log('We have now reached end of "qn" if.');
        } else if (food.food[userData.foodCategory][userData.answer].constructor === Array) {
          message = `<${getSpecificFood(food.food[userData.foodCategory], userData.answer).recipegif}|${getSpecificFood(food.food[userData.foodCategory], userData.answer).dishname}>`;
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
