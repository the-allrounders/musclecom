import { observable } from 'mobx';
import io from 'socket.io-client';

class ActionStore {
  @observable action = null;
  @observable actionsAvailable = 0;
  @observable sensorsCalibrated = undefined;
  @observable sensorsConnected = undefined;
  @observable actions = [];
  @observable ip = 'http://145.24.246.20:6969';

  constructor() {
    this.socket = io(`${window.location.pathname}${window.location.port}`);
    this.socket.on('action', this.setCurrentAction);
    this.socket.on('info', this.updateInfo);
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
