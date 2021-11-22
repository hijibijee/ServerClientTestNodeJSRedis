'use strict';

module.exports = {
  setMessage: setMessage
};

function setMessage(context, events, done) {
  const userName = 'user' + (Math.floor(Math.random() * 16000) + 1).toString()
  // make it available to templates as "message"
  context.vars.message = userName;
  return done();
}
