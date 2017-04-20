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
  console.log('fullMessage', fullMessage);
  const trimedMessageArray = trimMsg(fullMessage.toLowerCase().split(' '));
  console.log('trimedMessageArray', trimedMessageArray);
  const nextInArray = answer(trimedMessageArray);
  console.log('nextInArray', nextInArray);
  if (nextInArray) {
    return nextInArray;
  } else {
    return '';
  }
};

// console.log(handleMsg('osycon: @alphabot hey', query));
// console.log(handleMsg('osycon: @alphabot no', query));
// console.log(handleMsg('osycon: @alphabot yes', query));
// console.log(handleMsg('osycon: @alphabot nomaybe', query));
// console.log(handleMsg('osycon: @alphabot yes but how is this working', query));
