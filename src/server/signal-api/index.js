import EventEmitter from 'events';
import signalProcessing from '../signal-processing';

class SignalInterpretation extends EventEmitter {
  constructor() {
    super();
    // eslint-disable-next-line no-unused-vars
    signalProcessing.addListener('recieved-signal', (sensor, value) => {});
  }
}

export default new SignalInterpretation();
