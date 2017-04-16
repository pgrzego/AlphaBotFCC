'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const QAHasChanged = (user, answer, userData = { progress: 0, answer: 'q' }) => {
  console.log('QAHasChanged user', user);
  console.log('QAHasChanged answer', answer);
  console.log('QAHasChanged userData', userData);
  return ({
    progress: userData.progress + 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: userData.answer + answer
  });
};

const userHasProgressed = (user, userData, answer) => {
  console.log('userHasProgressed user', user);
  console.log('userHasProgressed answer', answer);
  console.log('userHasProgressed userData', userData);
  clearTimeout(userData.timeout);
  return QAHasChanged(user, answer, userData);
};

exports.userSentAnswer = (user, answer) => {
  console.log('user', user);
  console.log('answer', answer);
  return userStorage[user] = userStorage[user] ? userHasProgressed(user, userStorage[user], answer)
    : QAHasChanged(user, answer);
}
exports.getUserData = user => userStorage[user];
