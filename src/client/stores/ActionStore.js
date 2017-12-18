import { observable, computed } from 'mobx';
import socket from '../socket';
import Sensor from './Objects/Sensor';

class ActionStore {
  @observable action = null;
  @observable actionsAvailable = 0;
  @observable
  sensors = [
    new Sensor(1, false, false),
    new Sensor(2, false, false),
    new Sensor(3, false, false),
    new Sensor(4, false, false),
  ];
  @observable actions = [];
  @observable ip = 'http://145.24.246.20:6969';
  @observable timer = 2000;
  @observable totalMenuItems = 6;

  @computed
  get sensorsCalibrated() {
    return this.sensors.filter(sensor => sensor.calibrated).length;
  }

  @computed
  get sensorsConnected() {
    return this.sensors.filter(sensor => sensor.connected).length;
  }

  constructor() {
    socket.on('action', this.setCurrentAction);
    socket.on('info', this.updateInfo);

    const keysWithValues = {};

    const emitKey = (high, { key, code, ctrlKey }) => {
      if (code.substr(0, 5) === 'Digit' && keysWithValues[key] !== high) {
        keysWithValues[key] = high;
        socket.emit(`mocksensor`, {
          high,
          key: parseInt(key, 10),
          ctrlKey,
        });
      }
    };

    window.addEventListener('keydown', e => emitKey(1, e));
    window.addEventListener('keyup', e => emitKey(0, e));
  }

  setCurrentAction = action => {
    this.action = action;
  };

  updateInfo = ({ ip, actionsAvailable, sensors }) => {
    console.log(`Recieved new info from the back-end!
    Ip: ${ip}
    Actions available: ${actionsAvailable}
    Sensors:`);
    console.table(sensors);

    this.ip = `http://${ip}:6969`;
    this.actionsAvailable = actionsAvailable;
    sensors.forEach(({ channel, connected, calibrated }) => {
      const sensor = this.sensors.find(s => s.channel === channel);
      sensor.connected = connected;
      sensor.calibrated = calibrated;
    });
  };
}

const store = new ActionStore();
export default store;
export { ActionStore };
