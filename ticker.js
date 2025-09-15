import { EventEmitter } from 'node:events';

class EE extends EventEmitter {}

const ee = new EE();

const generateTick = () => {
  let i = 1;
  setInterval(() => {
    console.log(`Tick: ${i}`);
    i++;
    return i;
  }, 1000);
};

ee.on('tick', generateTick);

ee.emit('tick');
