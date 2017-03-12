'use strict';

const WAIT_PERIOD = 30000;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = QAHasReset(user);

const QAHasChanged = (defaultProgress) =>
  (user, userData = { progress: defaultProgress, timeout: null }) =>
    ({ progress: userData.progress + 1, timeout: newTimeout(user, WAIT_PERIOD) });

const newUserQA = QAHasChanged(0);
const QAHasReset = QAHasChanged(-1);
const QAHasProgressed = QAHasChanged();

const userHasProgressed = (user, userData) => {
  clearTimeout(userData.timeout);
  return QAHasProgressed(user, userData);
};

exports.userSentAnswer = user =>
  userStorage[user] = userStorage[user]
    ? userHasProgressed(user, userStorage[user])
    : newUserQA(user);

exports.getUserData = user => userStorage[user].progress;
