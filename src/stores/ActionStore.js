import { observable } from 'mobx';
import io from 'socket.io-client';

class ActionStore {
  @observable action = null;

  constructor( ) {
    this.socket = io('http://localhost:6969');
    this.socket.on('action', this.setCurrentAction);
  }

  setCurrentAction = (action) => {
    this.action = action;
  }
}

const store = new ActionStore(io);
export default store;
export {
  ActionStore,
}
