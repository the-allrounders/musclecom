import { observable } from 'mobx';
import socket from '../Socket';
import Sensor from './Objects/Sensor';

class ActionStore {
  @observable action = null;
  @observable actionsAvailable = 0;
  @observable sensorsCalibrated = undefined;
  @observable sensorsConnected = undefined;
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

  updateInfo = newInfo => {
    Object.entries(newInfo).forEach(([key, value]) => {
      if (key === 'ip') {
        this.ip = `http://${newInfo.ip}:6969`;
      } else if (key === 'sensors') {
        newInfo.sensors.forEach(({ channel, connected, calibrated }) => {
          const sensor = this.sensors.find(s => s.channel === channel);
          sensor.connected = connected;
          sensor.calibrated = calibrated;
        });
      } else if (key === 'actionsAvailable') {
        this[key] = value;
        if (value > 3) {
          this.totalMenuItems = value * 2;
        }
      } else {
        this[key] = value;
      }
    });
  };
}

const store = new ActionStore();
export default store;
export { ActionStore };
