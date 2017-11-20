import EventEmitter from "events";

class SignalProcessing extends EventEmitter {
  numOfSensors = 3;

  async init() {
    return {
      numOfSensors: this.numOfSensors,
    };
  }

  constructor() {
    super();
    this.emit("recieved-signal", 3, 1);
  }

  // Emits:
  // - recieved_signal: sensor_id, signal_value
}

export default new SignalProcessing();
