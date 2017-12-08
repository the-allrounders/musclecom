import EventEmitter from 'events';
import moment from 'moment';
import ip from 'internal-ip';
import { emit, listen, onConnection } from '../middleware/sockets';

class SignalProcessing extends EventEmitter {
  // async init() {
  //   return {
  //     numOfSensors: [],
  //   };
  // }

  constructor() {
    console.info('Starting signal processing');
    super();

    // Define our constants
    this.maxNumOfSensors = 4;
    this.calibrationTime = 5000;
    this.sensors = [];

    (async () => {
      // Dummy mode off
      this.dummy = false;

      // Try to import the module that allows us to read the adc
      // If this fails return dummy data
      try {
        const Ads1x15 = require('node-ads1x15'); // eslint-disable-line global-require, import/no-extraneous-dependencies
        this.adc = new Ads1x15(0);
      } catch (err) {
        console.info(
          'It appears you are not running this on a Raspberry, I will feed you dummy data for the called functions',
        );
        this.dummy = true;
      }

      // Set initial number of signals / sensors.
      await this.checkChannels();

      // Start collecting data
      this.startDataCollection();
      // await this.calibrateMin(1);
    })();
  }

  setGlobalListeners() {
    listen('onCalibrate', channel => {
      this.calibrateMin(channel);
    });

    listen('mocksensor', ({ high, key, cntrlKey }) => {
      if (!cntrlKey) {
        this.emit('receivedSignal', { sensor: key - 1, value: high });
      }
    });
  }

  /**
   * Read the channel for a single value
   *
   * @param channel
   */
  readChannel(channel) {
    console.info(`Reading channel: ${channel}`);
    if (!this.dummy && !this.adc.busy) {
      return new Promise(async resolve => {
        const samplesPerSecond = '250'; // see index.js for allowed values for your chip
        const progGainAmp = '4096'; // see index.js for allowed values for your chip

        await this.adc.readADCSingleEnded(
          channel,
          progGainAmp,
          samplesPerSecond,
          (err, data) => {
            if (err) {
              // Log the error code
              console.error(err);
            }

            console.info(`Channel Read: ${channel} : ${data}`);
            this.currentval = data;
            resolve(this.currentval);
          },
        );
      });
    }

    console.info('Device busy');
    return new Promise(resolve => {
      resolve(false);
    });
  }

  /**
   * Check how many channels are there
   *
   * @returns {*}
   */
  checkChannels() {
    return new Promise(async resolve => {
      console.info('Checking number of sensors');

      // Our channel return
      const sens = [];

      if (!this.dummy) {
        /*eslint-disable */ // Disable eslint for await in loop
        for(let count = 0; count < this.maxNumOfSensors; count += 1) {
          const objIndex = this.sensors.findIndex((obj => obj.channel === count));
          let newSens = {'channel': count, 'connected': false, 'calibrated': false};

          // Start reading the channel and break only if a value has returned
          let channelValue = await this.readChannel(count);
          if(channelValue > 10) { // Check for values larger than 10 to avoid channel interference
            newSens.connected = true;
            if(objIndex > -1 && this.sensors[objIndex].max > 0) {
              newSens.calibrated = true;
            } else { // add the new active sensor to the active list
              this.sensors.push({'channel': count, 'min': 3000, 'max': 0, 'value': channelValue});
            }
          } else if(objIndex > -1) { // Remove the inactive sensor from the active list
            this.sensors = this.sensors.splice(objIndex, 1);
          }

          // Return our channels
          sens.push(newSens);
        }
        /* eslint-enable */
        this.numOfSensors = sens;
        console.info(`Number of sensors final: ${this.numOfSensors}`);

        resolve(() => {
          console.info('Emitting sensors');

          // Emit the number of sensors
          this.emit('numberOfSensors', sens);
        });
      }

      const dummySens = [
        { channel: 0, connected: true, calibrated: true },
        { channel: 1, connected: true, calibrated: false },
        { channel: 2, connected: false, calibrated: false },
        { channel: 3, connected: false, calibrated: false },
      ];

      return dummySens;
    });
  }

  calibrateMin(channel) {
    emit('startCalibration', {
      channel,
      action: 'max',
      calibrationtime: this.calibrationTime,
      starttime: moment().unix(),
    });

    return new Promise(async resolve => {
      let count = 0;
      const objIndex = this.sensors.findIndex(obj => obj.channel === channel);
      while (count <= this.calibrationTime / 100) {
        console.info(`Calibration_counter:${count}`);
        let value = await this.readChannel(channel); // eslint-disable-line

        if (value > 0) {
          console.info(`SensorMin: ${this.sensors[objIndex].min}`);
          if (value < this.sensors[objIndex].min) {
            this.sensors[objIndex].min = value;
            console.info(`minval: ${value}`);
          }
        }
        count += 1;
      }

      // console.info({
      //     'channel': channel,
      //     'action': 'min',
      //     'calibrationtime': this.calibrationTime,
      //     'starttime': moment().unix()
      // });
      resolve(
        emit('stopCalibration', {
          channel,
          action: 'min',
          calibrationtime: this.calibrationTime,
          starttime: moment().unix(),
        }),
      );
    });
  }

  calibrateMax(channel) {
    emit('startCalibration', {
      channel,
      action: 'max',
      calibrationtime: this.calibrationTime,
      starttime: moment().unix(),
    });

    return new Promise(async resolve => {
      let count = 0;
      const objIndex = this.sensors.findIndex(obj => obj.channel === channel);
      while (count <= this.calibrationTime / 100) {
        console.info(`Calibration_counter:${count}`);
        let value = await this.readChannel(channel); // eslint-disable-line

        if (value > 0) {
          console.info(`SensorMax: ${this.sensors[objIndex].max}`);
          if (value > this.sensors[objIndex].max) {
            this.sensors[objIndex].max = value;
            console.info(`maxval: ${value}`);
          }
        }
        count += 1;
      }

      // console.info({
      //     'channel': channel,
      //     'action': 'max',
      //     'calibrationtime': this.calibrationTime,
      //     'starttime': moment().unix()
      // });
      resolve(
        emit('stopCalibration', {
          channel,
          action: 'max',
          calibrationtime: this.calibrationTime,
          starttime: moment().unix(),
        }),
      );
    });
  }

  /**
   * Start collecting data
   */
  async startDataCollection() {
    console.info('Start datacollection'); // Disable esLint for using await in loop
    this.dataCollection = true;
    let counter = 0;
    let muscleHigh = false;

    while (this.dataCollection && !this.dummy) {
      console.log(this.sensors);
      for (let index = 0; index < this.sensors.length; index += 1) {
        const value = await this.readChannel(this.sensors[index].channel); // eslint-disable-line

        if (value > 10) {
          // Saving to database
          console.info(`Saving:${value}`);
          this.sensors[index].value = value;

          // TODO implement proper signal processing here
          const base =
            (this.sensors[index].max - this.sensors[index].min) / 100 * 80;
          const signal = value - this.sensors[index].min;

          // We recieve wierd values... time to recalibrate...
          if (
            value < this.sensors[index].min ||
            value > this.sensors[index].max
          ) {
            console.info('Sudden movement');
          } else if (signal > base) {
            // Our signal is over our base lets emit the signal
            muscleHigh = true;
            this.emit('receivedSignal', {
              channel: this.sensors[index].channel,
              signal: 1,
            });
          }

          // Previous signal was high make sure we emit it is now low.
          if (signal < base && muscleHigh === true) {
            this.emit('receivedSignal', {
              channel: this.sensors[index].channel,
              signal: 0,
            });
          }
        }
      }

      // Check for new sensors every once in a while
      if (counter === 15000) {
        await this.checkChannels(); // eslint-disable-line
        counter = 0;
      }

      counter += 1;
    }
  }

  /**
   * Pause collecting data
   */
  pauseDataCollection() {
    this.dataCollection = false;
  }
}

export default new SignalProcessing();

onConnection(async socket => {
  socket.emit('info', {
    sensorsConnected: 2 + Math.floor(Math.random() * 5),
    availableActions: Math.floor(Math.random() * 5),
    sensorsCalibrated: 2 + Math.floor(Math.random() * 5),
    ip: ip.v4.sync(),
    signal: await SignalProcessing.init(),
  });
});
