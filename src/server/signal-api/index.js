/* eslint-disable */

import EventEmitter from 'events';
import signalProcessing from '../signal-processing';
import {emit, listen} from '../middleware/sockets';

class SignalInterpretation extends EventEmitter {

  constructor() {
    super();

    this.numberOfSensors = 0;

    setupConnection();
    addSPEventListeners();
  }

  setupConnection() {
    emit("numberOfSensors", this.numberOfSensors);
  }

  addSPEventListeners() {
    signalProcessing.addListener("recievedSignal", (sensor, value) => {
      console.log("received signal", sensor, value);
      // mongodbmeuk
      emit("receivedSignal", {sensor, value});
    });

    signalProcessing.addListener("numberOfSensors", (numSensors) => {
        console.log("number of sensors", numSensors);
        // mongodbmeuk
        this.numberOfSensors = numSensors;
        emit("numberOfSensors", numberOfSensors);
    });
  }
}

export default new SignalInterpretation();
