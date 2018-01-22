import EventEmitter from 'events';
import { emit, listen } from '../middleware/sockets';
import signal from './signal';

/** Number of milliseconds to calibrate a 'min' or 'max' value. */
const CALIBRATION_TIME = 5000;

/** Number of milliseconds to check which sensors connected. */
const CHECK_FOR_SENSOR_CONNECTIVITY = 15000;

/** The maximum number of values to use for the calculation of 'avg' and 'sd' */
const MAX_VALUES_FOR_AVERAGE_AND_DIVIATION = 5000;

class SignalProcessing extends EventEmitter {
  constructor() {
    super();

    // Define our constants
    this.sensors = [];
    for (let i = 0; i < 4; i += 1) {
      this.sensors.push({
        // The displayed channel ID.
        channel: i + 1,
        // The min and max EMG values measured while calibrating.
        min: 3000,
        max: 0,
        // The last measured EMG value
        value: 0,
        // The latest 5000 measured values
        values: [],
        // Some are used when calculationg if the value is HIGH or LOW
        avg: 0,
        tmpAvg: 0,
        sdAvg: 0,
        sd: 0,
        // If the sensor is connected
        connected: false,
        // If the sensor has calibration values
        calibrated: false,
      });
    }

    /** If a sensor needs to be calibrated, this is set to the sensor. */
    this.needsCalibration = null;
    listen('onCalibrate', channel => {
      this.needsCalibration = channel;
    });

    /** This is set to Date.now() every time all sensors are check for connectivity. */
    this.latestSensorCheck = 0;

    listen('mocksensor', ({ high, key, cntrlKey }) => {
      if (!cntrlKey) {
        this.emit('receivedSignal', { sensor: key - 1, value: high });
      }
    });
  }

  async init() {
    if (this.initializing) {
      throw new Error('You can only initialize once!');
    }
    this.initializing = true;

    // Set initial number of signals / sensors.
    await this.checkChannels();

    // We start the never-ending loop
    this.loop();
  }

  /**
   * This function is being run continuously.
   * Only do logic here that needs to happen every tick.
   */
  async loop() {
    if (this.needsCalibration) {
      /**
       * If a sensor is awaiting calibration (clicked button on remote), calibrate it immediately.
       */
      await this.calibrate(this.needsCalibration, false);
      this.needsCalibration = null;
    } else if (
      !this.sensors.find(sensor => sensor.connected) ||
      this.latestSensorCheck < Date.now() - CHECK_FOR_SENSOR_CONNECTIVITY
    ) {
      /**
       * If it was a more then 15s ago we checked for sensor connectivity, check it now.
       * Also check it every time we don't have any sensors available.
       */
      await this.checkChannels();

      this.latestSensorCheck = Date.now();
    } else {
      /**
       * Otherwhise, just update all values.
       */
      await this.updateAllValues();
    }

    // Run the loop again.
    this.loop();
  }

  /**
   * This function updates the values of all connected sensors.
   * It invokes 'recievedSignal' if the value changed from HIGH to LOW.
   */
  async updateAllValues() {
    for (const sensor of this.sensors.filter(s => s.connected)) {
      const value = await signal.read(sensor.channel); // eslint-disable-line no-await-in-loop

      // If the value was below 10, don't use this value.
      if (value <= 10) {
        continue;
      }

      // Saving current value
      sensor.value = value;
      sensor.values.push(value);
      if (sensor.values.length > MAX_VALUES_FOR_AVERAGE_AND_DIVIATION) {
        sensor.values.shift();
      }

      // Calculate average from latest values
      const total = sensor.values.reduce((sum, v) => sum + v, 0);
      sensor.avg = total / sensor.values.length;

      // Calculate square deviation.
      const squareDiffs = sensor.values.map(v => (v - sensor.avg) ** 2);
      const totalSquareDiffs = squareDiffs.reduce((sum, v) => sum + v, 0);
      const avgSquareDiffs = totalSquareDiffs / squareDiffs.length;
      sensor.sd = Math.sqrt(avgSquareDiffs);

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
          this.emit('receivedSignal', {
            channel: sensor.channel,
            signal: 1,
          });
        }

        // Previous signal was high make sure we emit it is now low.
        if (thisSignal < base) {
          this.emit('receivedSignal', {
            channel: sensor.channel,
            signal: 0,
          });
        }
      }
    }
  }

  /**
   * Check how many channels are there
   *
   * @returns {*}
   */
  async checkChannels() {
    console.info('Checking which sensors are connected.');

    // This is set to true when one of the sensor data changed, so we know we need to re-emit the sensor data.
    let sensorConnectivityChanged = false;

    for (const sensor of this.sensors) {
      // Start reading the channel and break only if a value has returned
      const channelValue = await signal.read(sensor.channel); // eslint-disable-line no-await-in-loop
      if (channelValue > 10) {
        // A value higher then 10 means it is connected.
        // If it wasn't connected before, emit this.
        if (!sensor.connected) {
          sensorConnectivityChanged = true;
        }
        sensor.connected = true;

        if (sensor.max > 0) {
          // If the sensor wasn't calibrated before, emit this.
          if (!sensor.calibrated) sensorConnectivityChanged = true;
          sensor.calibrated = true;
        }
      } else {
        if (sensor.connected) sensorConnectivityChanged = true;
        sensor.connected = false;
        sensor.calibrated = false;
        this.resetSensorCalibration(sensor.channel);
      }
    }

    if (sensorConnectivityChanged) {
      console.info('Emitting sensor connectivity.');
      // Emit the number of sensors
      this.emitSensors();
    }
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

    const startTime = Date.now();
    emit('startCalibration', {
      channel,
      action,
      calibrationTime: CALIBRATION_TIME,
      startTime: startTime / 1000,
    });

    // Current sensor
    const sensor = this.sensors.find(s => s.channel === channel);

    while (Date.now() < startTime + CALIBRATION_TIME) {
      // Read the values
      const value = await signal.read(channel); // eslint-disable-line no-await-in-loop

      if (max) {
        if (value > sensor.max) {
          sensor.max = value;
        }
      } else if (value > 0) {
        if (value < sensor.min) {
          sensor.min = value;
        }
      }
    }

    emit('stopCalibration', { channel });

    if (max) {
      // Re-emit the the checkChannels
      await this.checkChannels(); // eslint-disable-line no-await-in-loop
      console.log(`calibrated: ${channel}`);
    } else {
      await this.calibrate(channel, true);
    }
  }
}

export default new SignalProcessing();
