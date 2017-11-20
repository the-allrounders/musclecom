import EventEmitter from 'events';

class SignalProcessing extends EventEmitter {
  async init() {
    return {
      numOfSensors: this.numOfSensors,
    };
  }

  constructor() {
    super();
    this.numOfSensors = 3;
    this.emit('recieved-signal', 3, 1);
  }

  // Emits:
  // - recieved_signal: sensor_id, signal_value
}

export default new SignalProcessing();
