/* eslint-disable */

import EventEmitter from 'events';
import SignalController from '../signal-controller';
import SignalProcessing from '../signal-processing';
import {emit, listen} from '../middleware/sockets';
import RawSensorLog from '../db/models/raw-sensor-log';
import UserInputLog from '../db/models/user-input-log';
import ProcessedSensorLog from '../db/models/processed-sensor-log';
import Settings from '../db/models/settings';

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

    //Chosen menu items listener from frontend.
    listen("chosenMenuItem", (chosenMenuItem) => {
      const userInputLog = new UserInputLog({
        menuItemID: chosenMenuItem,
      });
      userInputLog.save();
    });

    listen("settingsChanged", (settingsArgs) => {
      settingsArgs.forEach(function(setting){
        const foundSetting = Settings.find({ key: setting.name });
        if(foundSetting.count() > 0 ) {
          Settings.update({ _id: foundSetting._id }, { $set: { value: setting.value }});
        }
        else {
          const newSetting = new Settings({
            key: setting.name,
            value: setting.value,
          });
          newSetting.save();
        }
      });
    });

    SignalController.addListener("chosenAction", (action) => {
      console.info("chosen action", action);
      emit("chosenAction", {action});
    });

    SignalController.addListener("recievedSignal", (sensor, value) => {
      console.info("received signal", sensor, value);
      const processedSensorLog = new ProcessedSensorLog({
        sensor: sensor,
        value: value,
      });
      processedSensorLog.save();
    });

    SignalController.addListener("numberOfSensors", (numSensors) => {
        console.info("number of sensors", numSensors);
        // mongodbmeuk
        this.numberOfSensors = numSensors;
        emit("numberOfSensors", numberOfSensors);
    });

    SignalProcessing.addListener("receivedSignal", ({sensor, value}) => {
      const rawSensorLog = new RawSensorLog({
        sensor: sensor,
        value: value,
      });
      rawSensorLog.save();
    });
  }
}

export default new SignalInterpretation();
