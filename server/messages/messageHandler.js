'use strict';

const trimMsg = (message) => {
  return message.slice(2, message.length);
};

const answer = (message) => {
  if (message.includes('yes')) {
    return 'y';
  } else if (message.includes('no')) {
    return 'n';
  } else {
    return false;
  }
};

exports.handleMsg = (fullMessage, string) => {
  const trimedMessageArray = trimMsg(fullMessage.toLowerCase().split(' '));
  const nextInArray = answer(trimedMessageArray);
  if (nextInArray) {
    return [...string, ...nextInArray].join('');
  } else {
    return 'Invalid message';
  }
};

// console.log(handleMsg('osycon: @alphabot hey', query));
// console.log(handleMsg('osycon: @alphabot no', query));
// console.log(handleMsg('osycon: @alphabot yes', query));
// console.log(handleMsg('osycon: @alphabot nomaybe', query));
// console.log(handleMsg('osycon: @alphabot yes but how is this working', query));
