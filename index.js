import { EventEmitter } from 'node:events';

class EE extends EventEmitter {}

const ee = new EE();

/* User Messages */
try {
  const { sendMessage, receiveMessage } = await import('./userMessages.js');
  ee.on('userMessage', sendMessage);
  ee.on('userMessage', receiveMessage);

  ee.emit('userMessage', {
    name: 'Sveta',
    message: 'message message message',
  });
} catch (err) {
  console.log(err);
}

/* Ticker */
try {
  const { ticker } = await import('./ticker.js');
  ee.on('tick', ticker);
  ee.emit('tick');
} catch (err) {
  console.log(err);
}
