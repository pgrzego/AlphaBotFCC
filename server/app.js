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

// let userProg = [];

// function isYes (message) {
//   if (message === 'yes') {
//     return true;
//   }
//   return false;
// }

// function isNo (message) {
//   if (message === 'no') {
//     return true;
//   }
//   return false;
// }

// function processMsgString (message) {
//   let newMsg = message.toLowerCase().split(' ');
//   return newMsg.splice(2);
// }

// function handleMsg (message, userProgress) {
//   const processedMsg = processMsgString(message);
//   console.log('processedMsg ', processedMsg);
//   if (userProgress < 2) {
//     console.log('levelOneQuestion');
//   } else {
//     console.log('next step in conversation');
//     // this is not returning what it should. will have to check.
//     const returnMessage = (processedMsg) => {
//       if (isYes(processedMsg)) {
//         return 'y';
//       } else if (isNo(processedMsg)) {
//         return 'n';
//       } else {
//         return 'Not valid message';
//       }
//     };
//     console.log('returnMessage ', returnMessage);
//     // if (returnMessage !== 'Not valid message') {
//     //   userProg.push(returnMessage);
//     // }
//   }
// }
/**
 * @param {object} data
 */
// let category = getRandomQuestion(questions.questions.level1);
let category = getRandomItem(food.food);

bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm
  console.log(data.content);
  console.log(category.category);
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
    const processedAnswer = handleMsg(data.content, 'q');
    userSentAnswer(user, processedAnswer);
    console.log(userData.answer);
    
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
      `<@${user}> you have contacted me in the past half a minute.`,
      params
    );
  }
});
