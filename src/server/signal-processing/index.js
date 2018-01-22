import EventEmitter from 'events';
import moment from 'moment';
import { emit, listen } from '../middleware/sockets';
import signal from './signal';

class SignalProcessing extends EventEmitter {
  init() {
    if (this.initializing) {
      this.checkChannels();
      return this.initializing;
    }
    this.initializing = this.realInit();
    return this.initializing;
  }

  async realInit() {
    // Set initial number of signals / sensors.
    await this.checkChannels();

    // Start collecting data
    this.startDataCollection();
  }

  constructor() {
    console.info('Starting signal processing');
    super();

    // Define our constants
    this.calibrationTime = 5000;
    this.calibrating = false;
    this.sensors = [];
    for (let i = 0; i < 4; i += 1) {
      this.sensors.push({
        channel: i + 1,
        min: 3000,
        max: 0,
        value: 0,
        avg: 0,
        tmpAvg: 0,
        sdAvg: 0,
        sd: 0,
        connected: false,
        calibrated: false,
      });
    }

    this.setGlobalListeners();
  }

  setGlobalListeners() {
    listen('onCalibrate', channel => {
      if (this.calibrating === false) {
        this.calibrating = true;
        this.pauseDataCollection();
        this.calibrate(channel, false);
      }
    });

    listen('mocksensor', ({ high, key, cntrlKey }) => {
      if (!cntrlKey) {
        this.emit('receivedSignal', { sensor: key - 1, value: high });
      }
    });
  }

  /**
   * Check how many channels are there
   *
   * @returns {*}
   */
  async checkChannels() {
    console.info('Checking number of sensors');

    for (const sensor of this.sensors) {
      // Start reading the channel and break only if a value has returned
      const channelValue = await signal.read(sensor.channel); // eslint-disable-line no-await-in-loop
      if (channelValue > 10) {
        // Check for values larger than 10 to avoid channel interference
        sensor.connected = true;
        if (sensor.max > 0) {
          sensor.calibrated = true;
        }
      } else {
        sensor.connected = false;
        sensor.calibrated = false;
        sensor.val = 0;
        this.resetSensorCalibration(sensor.channel);
      }
    }

    console.info('Emitting sensors');

    // Emit the number of sensors
    this.emitSensors();
  }

  emitSensors() {
    this.emit(
      'sensors',
      this.sensors.map(({ channel, connected, calibrated }) => ({
        channel,
        connected,
        calibrated,
      })),
    );
  }

  /**
   * Reset the sensor calibration
   * @param channel
   */
  resetSensorCalibration(channel) {
    const sensor = this.sensors.find(s => s.channel === channel);
    sensor.min = 3000;
    sensor.max = 0;
  }

  /**
   * Calibrate the sensor and set the min
   * @param channel
   * @param max
   * @returns {Promise<any>}
   */
  async calibrate(channel, max) {
    let action = 'min';
    // Reset the calibration the sensors
    if (!max) {
      this.resetSensorCalibration(channel);
    } else {
      action = 'max';
    }

    console.info(`Calibrating: ${channel}, action: ${action}`);

    const startTime = moment().unix();
    emit('startCalibration', {
      channel,
      action,
      calibrationTime: this.calibrationTime,
      startTime,
    });

    // await new Promise(r => setTimeout(r, 100));

    // Current sensor
    const sensor = this.sensors.find(s => s.channel === channel);

    // Post the number of sensors pre calibration
    await this.checkChannels();

    // Set our cancel boolean
    let cancel = false;

    listen('cancelCalibration', () => {
      cancel = true;
      emit('canceledCalibration', { channel });
    });

    // Count to check our average
    let count = 0;
    // Variable to save our average
    let average = 0;
    let SDaverage = 0;

    while (!cancel) {
      if (moment().unix() > startTime + this.calibrationTime / 1000) {
        emit('stopCalibration', { channel });
        cancel = true;

        if (max) {
          // Set the average
          sensor.avg = average / count;
          // Calulate the standard deviation
          sensor.sd = Math.sqrt(SDaverage / count);
          // Re-emit the the checkChannels
          await this.checkChannels(); // eslint-disable-line no-await-in-loop
          console.log(`calibrated: ${channel}`);
          this.calibrating = false;
          this.startDataCollection();
          return;
        }
        this.calibrate(channel, true);
        return;
      }

      // Read the values
      const value = await signal.read(channel); // eslint-disable-line no-await-in-loop

      if (max) {
        if (value > 0) {
          // console.info(`SensorMax: ${sensor.max}`);
          if (value > sensor.max) {
            sensor.max = value;
            // console.info(`maxval: ${value}`);
          }
          // Update our average
          average += value;
          SDaverage += (value - average / count) ** 2;
          // Update our counter
          count += 1;
        }
      } else if (value > 0) {
        // console.info(`SensorMin: ${sensor.min}`);
        if (value < sensor.min) {
          sensor.min = value;
          // console.info(`minval: ${value}`);
        }
      }
    }
  }

  /**
   * Start collecting data
   */
  async startDataCollection() {
    console.info('Start datacollection');
    this.dataCollection = true;
    let counter = 0;
    let muscleHigh = false;
    while (this.dataCollection) {
      for (const sensor of this.sensors.filter(s => s.connected)) {
        // eslint-disable-line no-restricted-syntax
        const value = await signal.read(sensor.channel); // eslint-disable-line no-await-in-loop

        if (value > 10) {
          // Saving current value
          sensor.value = value;
          // Adding new avg
          sensor.tmpAvg += value;
          sensor.sdAvg += (value - sensor.tmpAvg / counter) ** 2;

          // If our values fall below the minimum or above the maximum, ignore the value
          if (value < sensor.max && value > sensor.min) {
            const thisSignal = value - sensor.min;

            // TODO 80% method
            // const base = (sensor.max - sensor.min) / 100 * 80;

            // TODO AVG only method
            // const base = sensor.avg - sensor.min;

            // TODO SD method
            const base = sensor.avg - sensor.min + sensor.sd;

            if (thisSignal > base) {
              // Our signal is over our base lets emit the signal
              muscleHigh = true;
              this.emit('receivedSignal', {
                channel: sensor.channel,
                signal: 1,
              });
            }

            // Previous signal was high make sure we emit it is now low.
            if (thisSignal < base && muscleHigh === true) {
              this.emit('receivedSignal', {
                channel: sensor.channel,
                signal: 0,
              });
            }
          }
        }
      }

      // Check for new sensors every once in a while
      if (counter === 5000) {
        // Recalculate avg and sd
        for (const sensor of this.sensors.filter(s => s.connected)) {
          sensor.sd = Math.sqrt(sensor.sdAvg / 5000);
          sensor.avg = sensor.tmpAvg / 5000;
          sensor.tmpAvg = 0;
        }
        // Check for new sensors
        await this.checkChannels(); // eslint-disable-line no-await-in-loop
        counter = 0;
      }

      counter += 1;
    }
  }

  /**
   * Pause collecting data
   */
  pauseDataCollection() {
    console.log('Pausing data collection');
    this.dataCollection = false;
  }
}

export default new SignalProcessing();
