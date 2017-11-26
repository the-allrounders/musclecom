/* eslint-disable */

import EventEmitter from 'events';
import signalProcessing from '../signal-processing';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

class SignalInterpretation extends EventEmitter {

  constructor() {
    super();

    this.socket = null;
    this.numberOfSensors = 0;

    setupConnection();
    addSPEventListeners();
  }

  setupConnection() {
    io.on("connection", function(socket){
      console.log("User connected");
      this.socket = socket;
      this.socket.emit("numberOfSensors", this.numberOfSensors);

      socket.on("disconnect", function(){
        console.log("User disconnected");
        this.socket = null;
      });
    });
  }

  addSPEventListeners() {
    signalProcessing.addListener("recievedSignal", (sensor, value) => {
      console.log("received signal", sensor, value);
      // mongodbmeuk
      if(this.socket) {
        this.socket.emit("receivedSignal", {sensor, value});
      }
    });

    signalProcessing.addListener("numberOfSensors", (numSensors) => {
        console.log("number of sensors", numSensors);
        // mongodbmeuk
        this.numberOfSensors = numSensors;
        if(this.socket) {
          this.socket.emit("numberOfSensors", numberOfSensors);
        }
    });
  }
}

export default new SignalInterpretation();
