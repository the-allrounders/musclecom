import EventEmitter from "events";

class SignalProcessing extends EventEmitter{

    async init() {
        return {
            numOfSensors: 3,
        };
    }

    constructor() {
        this.emit('recieved-signal', 3, 1);
    }

    // Emits:
    // - recieved_signal: sensor_id, signal_value
}


export default new SignalProcessing();