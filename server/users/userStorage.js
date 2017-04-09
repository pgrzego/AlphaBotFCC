'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const QAHasChanged = (user, answer, userData = { progress: 0 }) => {
  return ({
    progress: userData.progress + 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: 'q'
  });
};

const userHasProgressed = (user, userData, answer) => {
  clearTimeout(userData.timeout);
  return QAHasChanged(user, userData, answer);
};

exports.userSentAnswer = (user, answer) =>
  userStorage[user] = userStorage[user]
    ? userHasProgressed(user, answer, userStorage[user])
    : QAHasChanged(user, answer);

exports.getUserData = user => userStorage[user];
