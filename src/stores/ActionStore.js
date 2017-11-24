import { observable } from 'mobx';
import io from 'socket.io-client';

class ActionStore {
  @observable action = null;

  constructor( ) {
    this.socket = io('http://localhost:3033');
    this.socket.on('action', this.setCurrentAction);
  }

  setCurrentAction = (action) => {
    this.action = action;
  }
}

export default new ActionStore(io);
