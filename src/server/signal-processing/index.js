import EventEmitter from 'events';

class SignalProcessing extends EventEmitter {
  async init() {
    return {
      numOfSensors: this.numOfSensors,
    };
  }

  constructor() {
    super();

    // Set initial number of signals / sensors.
    this.numOfSensors = 10;

    // ** How to send a signal to the api.**
    // @params
    // string : eventName
    // int : sensorNumber
    // bool : activation
    this.emit('recievedSignal', 3, true);

    // ** Send a amount of sensors to set within the API. **
    // @params
    // string : eventName
    // int : sensorNumber
    this.emit('numberOfSensors', this.numOfSensors);
  }
}

export default new SignalProcessing();
