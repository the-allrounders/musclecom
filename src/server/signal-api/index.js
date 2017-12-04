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
    SignalController.addListener("chosenAction", (sensor, value) => {
      console.info("chosen action", sensor, value);
      emit("chosenAction", {action});
      // mongodbmeuk

    });

    SignalController.addListener("recievedSignal", (sensor, value) => {
      console.info("received signal", sensor, value);
      // mongodbmeuk
    });

    SignalController.addListener("numberOfSensors", (numSensors) => {
        console.info("number of sensors", numSensors);
        // mongodbmeuk
        this.numberOfSensors = numSensors;
        emit("numberOfSensors", numberOfSensors);
    });
  }
}

export default new SignalInterpretation();
