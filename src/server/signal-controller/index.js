import EventEmitter from 'events';
import ip from 'internal-ip';
import signalProcessing from '../signal-processing';
import { emit, onConnection } from '../middleware/sockets';
import Settings from '../db/models/settings';

class SignalController extends EventEmitter {
  constructor() {
    super();

    this.numberOfSensors = 0;
    this.addSPEventListeners();

    this.sensors = [];

    this.currentAction = 0;

    this.actionDelayTimeout = null;

    Settings.find({ key: 'actionDelayTimeout' }, (err, result) => {
      console.info('actionDelayResult', result);
      if (result.length > 0) {
        this.actionDelayTimeout = result[0].value;
      }
    });

    this.resetSensorChangeTimeout();

    for (let i = 0; i < this.numberOfSensors; i += 1) {
      this.sensors.push(0);
    }
  }

  initialEmits() {
    emit('numberOfSensors', this.numOfSensors);
  }

  addSPEventListeners() {
    signalProcessing.addListener('receivedSignal', ({ sensor, value }) => {
      console.log(`Sensor ${sensor} is now ${value ? 'HIGH' : 'LOW'}`);
      this.resetSensorChangeTimeout();

      this.sensors[sensor] = value;
      const binary = [...this.sensors].reverse().join('');
      this.currentAction = parseInt(binary, 2);
      console.log(emit);
      emit('intendedAction', this.currentAction);

      this.resetSensorChangeTimeout();
    });

    signalProcessing.addListener('numberOfSensors', numSensors => {
      this.numberOfSensors = numSensors;
      this.sensors = [];
      for (let i = 0; i < this.numberOfSensors; i += 1) {
        this.sensors.push(0);
      }
      emit('numberOfSensors', this.numberOfSensors);
    });
  }

  resetSensorChangeTimeout() {
    if (this.sensorChangeTimeout) {
      clearTimeout(this.sensorChangeTimeout);
      this.sensorChangeTimeout = null;
    }
    this.sensorChangeTimeout = setTimeout(() => {
      emit('chosenAction', this.currentAction);

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
  await signalProcessing.init();
  socket.emit('info', {
    actionsAvailable: Math.floor(Math.random() * 5),
    ip: ip.v4.sync(),
  });
});
