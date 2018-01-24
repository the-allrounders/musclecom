import EventEmitter from 'events';
import signalProcessing from '../signal-processing';
import Settings from '../db/models/settings';

class SignalController extends EventEmitter {
  constructor() {
    super();
    this.addSPEventListeners();

    this.sensorValues = [];

    this.currentAction = 0;

    this.actionDelayTimeout = null;

    Settings.find({ key: 'actionDelayTimeout' }, (err, result) => {
      console.info('actionDelayResult', result);
      if (result.length > 0) {
        this.actionDelayTimeout = result[0].value;
      }
    });

    this.resetSensorChangeTimeout();
  }

  // eslint-disable-next-line class-methods-use-this
  async init() {
    await signalProcessing.init();
  }

  addSPEventListeners() {
    signalProcessing.addListener('receivedSignal', (sensor, value) => {
      console.log(value);
      console.log(`Sensor ${sensor} is now ${value ? 'HIGH' : 'LOW'}`);
      this.resetSensorChangeTimeout();

      this.sensorValues[sensor] = value;
      const binary = [...this.sensorValues].reverse().join('');
      this.currentAction = parseInt(binary, 2);
      this.emit('intendedAction', this.currentAction);

      this.resetSensorChangeTimeout();
    });

    signalProcessing.addListener('sensors', sensors => {
      this.sensorValues = sensors.map(() => 0);
      this.emit('sensors-data', {
        sensors,
        actionsAvailable:
          2 ** sensors.filter(s => s.connected && s.calibrated).length - 1,
      });
    });
  }

  resetSensorChangeTimeout() {
    if (this.sensorChangeTimeout) {
      clearTimeout(this.sensorChangeTimeout);
      this.sensorChangeTimeout = null;
    }
    this.sensorChangeTimeout = setTimeout(() => {
      this.emit('chosenAction', this.currentAction);

      if (this.sensorChangeTimeout) {
        clearTimeout(this.sensorChangeTimeout);
        this.sensorChangeTimeout = null;
      }
      this.resetSensorChangeTimeout();
    }, this.actionDelayTimeout);
  }
}

export default new SignalController();
