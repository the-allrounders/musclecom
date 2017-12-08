import { observable } from 'mobx';
import io from 'socket.io-client';
import Sensor from './Objects/Sensor';

class ActionStore {
  @observable action = null;
  @observable actionsAvailable = 0;
  @observable sensorsCalibrated = undefined;
  @observable sensorsConnected = undefined;
  @observable sensors = [
    new Sensor(1, true, false),
    new Sensor(2, false, false),
    new Sensor(3, false, false),
    new Sensor(4, false, false),
  ];
  @observable actions = [];
  @observable ip = 'http://145.24.246.20:6969';

  constructor() {
    this.socket = io(window.location.origin);
    this.socket.on('action', this.setCurrentAction);
    this.socket.on('info', this.updateInfo);
    setTimeout(() => { this.sensors[1].connected = true; }, 5000);

    const emitKey = (high, {key, code, ctrlKey}) => {
      if(code.substr(0, 5) === 'Digit') {
        this.socket.emit(`mocksensor`, {high, key: parseInt(key, 10), ctrlKey});
      }
    };

    window.addEventListener('keydown', (e) => emitKey(1, e));
    window.addEventListener('keyup', (e) => emitKey(0, e));
  }

  setCurrentAction = (action) => {
    this.action = action;
  }

  updateInfo = (newInfo) => {
    this.actionsAvailable = newInfo.actionsAvailable;
    this.sensorsCalibrated = newInfo.sensorsCalibrated;
    this.sensorsConnected = newInfo.sensorsConnected;
    this.actions = newInfo.actions;
    this.ip = `http://${newInfo.ip}:6969`;
  }
}

const store = new ActionStore(io);
export default store;
export {
  ActionStore,
}
