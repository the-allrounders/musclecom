import { observable } from 'mobx';

class Sensor {
  @observable channel;
  @observable connected;
  @observable calibrated;

  constructor(channel, connected, calibrated) {
    this.channel = channel;
    this.connected = connected;
    this.calibrated = calibrated;
  }
}

export default Sensor;
