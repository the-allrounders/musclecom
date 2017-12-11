/* eslint-disable */

import EventEmitter from 'events';
import signalProcessing from '../signal-processing';
import {emit} from '../middleware/sockets';
import Settings from '../db/models/settings';

class SignalController extends EventEmitter {

  constructor() {
    super();

    this.numberOfSensors = 0;
    this.addSPEventListeners();

    this.sensorsObject = {};

    this.sensorChangeTimeout;

    this.latestAction = -1;

    this.actionDelayTimeout = null;

    const actionDelayTimeoutSetting = Settings.find({ key: "actionDelayTimeout" });
    if(actionDelayTimeoutSetting.count() > 0 ) {
      this.actionDelayTimeout = actionDelayTimeoutSetting[0];
    }
  }

  initialEmits() {
    this.emit("numberOfSensors", this.numOfSensors);
  }

  addSPEventListeners() {
    signalProcessing.addListener("receivedSignal", ({sensor, value}) => {
      console.log(`Sensor ${sensor} is now ${value ? 'HIGH' : 'LOW'}`);
      if(this.sensorChangeTimeout) {
        clearTimeout(this.sensorChangeTimeout);
        this.sensorChangeTimeout = null;
      }

      let timeoutTime = 2000;
      //get timeout time from user settings
      let sensorString = String(sensor);
      this.sensorsObject[sensorString] = value;
      this.sensorChangeTimeout = setTimeout( () => {
        let binary = '';

        for (let key in this.sensorsObject) {
          // skip loop if the property is from prototype
          if (!this.sensorsObject.hasOwnProperty(key)) continue;

          let finalValue = this.sensorsObject[key];
          let tempBinary = finalValue ? '1' : '0';
          binary += tempBinary;
          this.emit("recievedSignal", sensor, value);
        }

        let action = parseInt(binary, 2);
        this.emit("chosenAction", action);

        if(this.sensorChangeTimeout) {
          clearTimeout(this.sensorChangeTimeout);
          this.sensorChangeTimeout = null;
        }
      }, timeoutTime);
    });

    signalProcessing.addListener("numberOfSensors", (numSensors) => {
        this.numberOfSensors = numSensors;
        this.emit("numberOfSensors", this.numOfSensors);
    });
  }
}

export default new SignalController();
