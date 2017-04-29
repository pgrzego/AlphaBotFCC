'use strict';

const WAIT_PERIOD = process.env.WAIT_PERIOD;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => (userStorage[user] = undefined);

const changeUserState = (user, answer, foodCategory, userData) => {
  return {
    progress: userData.progress + 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: userData.answer + answer,
    foodCategory: userData.foodCategory
  };
};

const userHasProgressed = (user, answer, foodCategory, userData) => {
  clearTimeout(userData.timeout);
  return changeUserState(user, answer, foodCategory, userData);
};

exports.userSentAnswer = (user, answer, foodCategory) => {
  return (userStorage[user] = userHasProgressed(
    user,
    answer,
    foodCategory,
    userStorage[user]
  ));
};

exports.getUserData = user => {
  return userStorage[user];
};

exports.initializeUser = (user, foodCategory) => {
  return (userStorage[user] = {
    progress: 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: 'q',
    foodCategory: foodCategory
  });
};

exports.resetUser = user => {
  userStorage[user] = undefined;
};
