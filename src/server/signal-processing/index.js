import EventEmitter from 'events';
import ip from 'internal-ip';
import { listen, onConnection } from '../middleware/sockets';

class SignalProcessing extends EventEmitter {
  async init() {
    return {
      numOfSensors: this.sensors.length,
    };
  }

  constructor() {
    console.info('Starting signal processing');
    super();

    listen('mocksensor', ({ high, key, cntrlKey }) => {
      if (!cntrlKey) {
        this.emit('receivedSignal', { sensor: key - 1, value: high });
      }
    });

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
      this.numOfSensors = await this.checkChannels();
      console.info(`Number of sensors final: ${this.numOfSensors}`);

      // Emit the number of sensors
      this.emit('numberOfSensors', this.numberOfSensors);

      // Start collecting data
      this.startDataCollection();
      // this.calibrateMin(1);
    })();
  }

  /**
   * Read the channel for a single value
   *
   * @param channel
   * @param callback
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

      if (!this.dummy) {
        /*eslint-disable */ // Disable eslint for await in loop
                for(let count = 0; count < this.maxNumOfSensors; count += 1) {
                    // Start reading the channel and break only if a value has returned
                    let channelValue = await this.readChannel(count);
                    if(channelValue > 10) { // Check for values larger than 10 to avoid channel interference
                        this.sensors.push({'channel': count, 'min': 3000, 'max': 0, 'value': channelValue});
                    }
                }
                /* eslint-enable */

        resolve(this.sensors.length);
      }

      return SignalProcessing.getRandomInt(1, 4);
    });
  }

  calibrateMin(channel) {
    let count = 0;
    const objIndex = this.sensors.findIndex(obj => obj.channel === channel);
    const intervalID = setInterval(async () => {
      console.info(`Calibration_counter:${count}`);
      const value = await this.readChannel(channel);

      if (value > 0) {
        console.info(`SensorMin: ${this.sensors[objIndex].min}`);
        if (value < this.sensors[objIndex].min) {
          this.sensors[objIndex].min = value;
          console.info(`minval: ${value}`);
        }
      }

      if (count === this.calibrationTime / 100) {
        console.info('Clearing calibration interval');
        clearInterval(intervalID);
      }
      count += 1;
    }, 100);
  }

  calibrateMax(channel) {
    let count = 0;
    const objIndex = this.sensors.findIndex(obj => obj.channel === channel);
    const intervalID = setInterval(async () => {
      console.info(`Calibration_counter:${count}`);
      const value = await this.readChannel(channel);

      if (value > 0) {
        console.info(`SensorMax: ${this.sensors[objIndex].max}`);
        if (value > this.sensors[objIndex].max) {
          this.sensors[objIndex].max = value;
          console.info(`maxval: ${value}`);
        }
      }

      if (count === this.calibrationTime / 100) {
        console.info('Clearing calibration interval');
        clearInterval(intervalID);
      }
      count += 1;
    }, 100);
  }

  /**
   * Start collecting data
   */
  async startDataCollection() {
    console.info('Start datacollection'); // Disable esLint for using await in loop
    this.dataCollection = true;
    console.log(this.dummy);
    while (this.dataCollection && !this.dummy) {
      console.log(this.sensors);
      for (let index = 0; index < this.sensors.length; index += 1) {
        const value = await this.readChannel(this.sensors[index].channel); // eslint-disable-line no-await-in-loop

        if (value > 0) {
          // Saving to database
          console.info(`Saving:${value}`);
          this.sensors[index].value = value;
          // this.emit("receivedSignal", {sensor, value});
        }
      }
    }
    /* eslint-enable */
  }

  /**
   * Pause collecting data
   */
  pauseDataCollection() {
    this.datacollection = false;
  }

  /**
   * Return the sensor array
   *
   * @returns {Array}
   */
  getSensors() {
    return this.sensors;
  }

  /**
   * Get a random integer value used for dummy data
   * @param min
   * @param max
   * @returns {*}
   */
  static getRandomInt(minFloat, maxFloat) {
    const min = Math.ceil(minFloat);
    const max = Math.floor(maxFloat);
    return Math.floor(Math.random() * (max - min)) + min;
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
