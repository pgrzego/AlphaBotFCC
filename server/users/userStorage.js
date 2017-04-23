'use strict';

const WAIT_PERIOD = process.env.WAIT_PERIOD;
let userStorage = {};

const newTimeout = (user, duration) => setTimeout(userTimedOut(user), duration);

const userTimedOut = user => () => userStorage[user] = undefined;

const changeUserState = (user, answer, userData) => {
  return ({
    progress: userData.progress + 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: userData.answer + answer,
    foodCategory: userData.foodCategory
  });
};

const userHasProgressed = (user, answer, userData) => {
  clearTimeout(userData.timeout);
  return changeUserState(user, answer, userData);
};

exports.userSentAnswer = (user, answer) => {
  return userStorage[user] = userHasProgressed(user, answer, userStorage[user]);
}

exports.getUserData = user => {
  return userStorage[user];
}

exports.initializeUser = (user, foodCategory) => {
  return userStorage[user] = {
    progress: 1,
    timeout: newTimeout(user, WAIT_PERIOD),
    answer: 'q',
    foodCategory: foodCategory
  };
}

exports.resetUser = user => {
  userStorage[user] = undefined;
  console.log('user from resetUser', user);
  console.log('Userstorage from resetUser', userStorage[user]);
}
