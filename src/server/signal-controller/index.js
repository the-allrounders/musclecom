/* eslint-disable */

import EventEmitter from 'events';
import signalProcessing from '../signal-processing';
import { emit, onConnection } from '../middleware/sockets';
import Settings from '../db/models/settings';
import ip from "internal-ip";

class SignalController extends EventEmitter {

  constructor() {
    super();

    this.numberOfSensors = 0;
    this.addSPEventListeners();

    this.sensorsObject = {};

    this.sensorChangeTimeout;

    this.currentAction = 0;

    this.actionDelayTimeout = null;

    Settings.find({ key: "actionDelayTimeout" }, (err, result) => {
      console.info("actionDelayResult", result);
      if(result.length > 0 ) {
        this.actionDelayTimeout = result[0].value;
      }
    });

    this.resetSensorChangeTimeout();

    for (let i = 0; i < this.numberOfSensors; i++) {
      this.sensorsObject[String(i)] = 0;
    }
  }

  initialEmits() {
    this.emit("numberOfSensors", this.numOfSensors);
  }

  addSPEventListeners() {
    signalProcessing.addListener("receivedSignal", ({sensor, value}) => {
      console.log(`Sensor ${sensor} is now ${value ? 'HIGH' : 'LOW'}`);
      this.resetSensorChangeTimeout();

      let sensorString = String(sensor);
      this.sensorsObject[sensorString] = value;
      let binary = '';

      for (let key in this.sensorsObject) {
        // skip loop if the property is from prototype
        if (!this.sensorsObject.hasOwnProperty(key)) continue;

        let finalValue = this.sensorsObject[key];
        console.info("logFinalValueSensorObject", this.sensorsObject);
        let tempBinary = finalValue ? '1' : '0';
        binary += tempBinary;
        this.emit("recievedSignal", sensor, value);
      }

      binary = binary.split("").reverse().join("");
      this.currentAction = parseInt(binary, 2);
      this.emit("intendedAction", this.currentAction);

      this.resetSensorChangeTimeout();
    });

    signalProcessing.addListener("numberOfSensors", (numSensors) => {
        this.numberOfSensors = numSensors;
        this.sensorsObject = {};
        for (let i = 0; i < this.numberOfSensors; i++) {
          this.sensorsObject[String(i)] = 0;
        }
        this.emit("numberOfSensors", this.numberOfSensors);
    });
  }

  resetSensorChangeTimeout() {
    if(this.sensorChangeTimeout) {
      clearTimeout(this.sensorChangeTimeout);
      this.sensorChangeTimeout = null;
    }
    this.sensorChangeTimeout = setTimeout( () => {
      this.emit("chosenAction", this.currentAction);

      if(this.sensorChangeTimeout) {
        clearTimeout(this.sensorChangeTimeout);
        this.sensorChangeTimeout = null;
      }
      this.resetSensorChangeTimeout();
    }, this.actionDelayTimeout);
  }
}

export default new SignalController();

onConnection(async socket => {
  await signalProcessing.init();
  socket.emit('info', {
    actionsAvailable: Math.floor(Math.random() * 5),
    ip: ip.v4.sync(),
  });
});
