import { observable } from 'mobx';
import io from 'socket.io-client';

class ActionStore {
  @observable action = null;
  @observable actionCount = 0;
  @observable calibrationInfo = undefined;
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
    this.actionCount = newInfo.actionCount;
    this.calibrationInfo = newInfo.calibrationInfo;
    this.actions = newInfo.actions;
  }
}

const store = new ActionStore(io);
export default store;
export {
  ActionStore,
}
