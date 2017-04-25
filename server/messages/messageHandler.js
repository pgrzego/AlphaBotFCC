'use strict';

const trimMsg = (message) => {
  return message.slice(2, message.length);
};

const answer = (message) => {
  if (message.includes('yes')) {
    return 'y';
  } else if (message.includes('no')) {
    return 'n';
  } else if (message.includes('restart')) {
    return 'r';
  } else {
    return false;
  }
};

exports.handleMsg = (fullMessage) => {
  const trimedMessageArray = trimMsg(fullMessage.toLowerCase().split(' '));
  const nextInArray = answer(trimedMessageArray);
  if (nextInArray) {
    return nextInArray;
  } else {
    return '';
  }
};
