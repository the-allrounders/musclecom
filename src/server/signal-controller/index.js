import EventEmitter from 'events';
import ip from 'internal-ip';
import signalProcessing from '../signal-processing';
import { onConnection } from '../middleware/sockets';
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
    signalProcessing.addListener('receivedSignal', ({ sensor, value }) => {
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
      this.emit('sensors', sensors);
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

onConnection(async socket => {
  socket.emit('info', {
    actionsAvailable: Math.floor(Math.random() * 5),
    ip: ip.v4.sync(),
  });
});
