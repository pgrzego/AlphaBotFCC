'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = QAHasChanged(user);

const QAHasChanged = (user, userData = { progress: -1, timeout: null }) =>
({ progress: userData.progress + 1, timeout: newTimeout(user, WAIT_PERIOD) });

const userHasProgressed = (user, userData) => {
  clearTimeout(userData.timeout);
  return QAHasChanged(user, userData);
};

exports.userSentAnswer = user =>
  userStorage[user] = userStorage[user]
    ? userHasProgressed(user, userStorage[user])
    : QAHasChanged(user, { progress: 0, timeout: null });

exports.getUserData = user => userStorage[user].progress;
