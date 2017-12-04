/* eslint-disable */

import EventEmitter from 'events';
import SignalController from '../signal-controller';
import {emit, listen} from '../middleware/sockets';

class SignalInterpretation extends EventEmitter {

  constructor() {
    super();

    this.numberOfSensors = 0;

    this.setupConnection();
    this.addSCEventListeners();
  }

  setupConnection() {
    emit("numberOfSensors", this.numberOfSensors);
  }

  addSCEventListeners() {
    SignalController.addListener("recievedSignal", (sensor, value) => {
      console.log("received signal", sensor, value);
      // mongodbmeuk
      emit("receivedSignal", {sensor, value});
    });

    SignalController.addListener("numberOfSensors", (numSensors) => {
        console.log("number of sensors", numSensors);
        // mongodbmeuk
        this.numberOfSensors = numSensors;
        emit("numberOfSensors", numberOfSensors);
    });
  }
}

export default new SignalInterpretation();
