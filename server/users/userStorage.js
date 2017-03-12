'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const QAHasChanged = (user, userData = { progress: 0 }) =>
({ progress: userData.progress + 1, timeout: newTimeout(user, WAIT_PERIOD) });

const userHasProgressed = (user, userData) => {
  clearTimeout(userData.timeout);
  return QAHasChanged(user, userData);
};

exports.userSentAnswer = user =>
  userStorage[user] = userStorage[user]
    ? userHasProgressed(user, userStorage[user])
    : QAHasChanged(user);

exports.getUserData = user => userStorage[user].progress;
