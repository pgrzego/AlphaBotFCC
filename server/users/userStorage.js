'use strict';

const WAIT_PERIOD = 10000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const QAHasChanged = (user, answer, userData = { progress: 0, answer: 'q' }) => {
  return ({
    progress: userData.progress + 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: userData.answer + answer
  });
};

const userHasProgressed = (user, userData, answer) => {
  clearTimeout(userData.timeout);
  return QAHasChanged(user, answer, userData);
};

exports.userSentAnswer = (user, answer) => {
  return userStorage[user] = userStorage[user] ? userHasProgressed(user, userStorage[user], answer)
    : QAHasChanged(user, answer);
}
exports.getUserData = user => {
  return userStorage[user];
}

exports.resetUser = user => {
  userStorage[user] = undefined;
  console.log('user from resetUser', user);
  console.log('Userstorage from resetUser', userStorage[user]);
}
