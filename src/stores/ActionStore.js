import { observable } from 'mobx';
import io from 'socket.io-client';

class ActionStore {
  @observable action = null;
  @observable actionsAvailable = 0;
  @observable sensorsCalibrated = undefined;
  @observable sensorsConnected = undefined;
  @observable actions = [];

  constructor( ) {
    this.socket = io('http://localhost:6969');
    this.socket.on('action', this.setCurrentAction);
    this.socket.on('info', this.updateInfo);
  }

  setCurrentAction = (action) => {
    this.action = action;
  }

  updateInfo = (newInfo) => {
    console.log('newinfo', newInfo);
    this.actionsAvailable = newInfo.actionsAvailable;
    this.sensorsCalibrated = newInfo.sensorsCalibrated;
    this.sensorsConnected = newInfo.sensorsConnected;
    this.actions = newInfo.actions;
  }
}

const store = new ActionStore(io);
export default store;
export {
  ActionStore,
}
