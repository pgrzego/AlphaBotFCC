'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const QAHasChanged = (user, question, answer, userData = { progress: 0 }) => {
  return ({ 
  progress: userData.progress + 1, 
  timeout: newTimeout(user, WAIT_PERIOD),
  question,
  answer
})};

const userHasProgressed = (user, userData, question, answer) => {
  clearTimeout(userData.timeout);
  return QAHasChanged(user, userData, question, answer);
};

exports.userSentAnswer = (user, question, answer) => 
  userStorage[user] = userStorage[user]
    ? userHasProgressed(user, question, answer, userStorage[user])
    : QAHasChanged(user, question, answer);

exports.getUserData = user => userStorage[user];
