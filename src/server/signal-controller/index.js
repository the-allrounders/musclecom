/* eslint-disable */

import EventEmitter from 'events';
import signalProcessing from '../signal-processing';

class SignalController extends EventEmitter {

  constructor() {
    super();

    this.numberOfSensors = 0;
    this.addSPEventListeners();
  }

  initialEmits() {
    this.emit("numberOfSensors", this.numOfSensors);
  }

  addSPEventListeners() {
    signalProcessing.addListener("recievedSignal", (sensor, value) => {
      this.emit("recievedSignal", 3, true);
    });

    signalProcessing.addListener("numberOfSensors", (numSensors) => {
        this.numberOfSensors = numSensors;
        this.emit("numberOfSensors", this.numOfSensors);
    });
  }
}

export default new SignalController();
