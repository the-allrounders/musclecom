import { listen } from '../middleware/sockets';
import log from '../log';

const samplesPerSecond = '250'; // see index.js for allowed values for your chip
const progGainAmp = '4096'; // see index.js for allowed values for your chip

class Sensors {
  constructor() {
    /**
     * This is used to determine if we were already reading the ADC.
     */
    this.reading = false;

    /**
     * If in dummy mode, this will be null.
     * Otherwise, the instance of Ads.
     */
    this.adc = null;

    /**
     * Create a new instance of Ads
     */
    try {
      const Ads1x15 = require('node-ads1x15'); // eslint-disable-line global-require, import/no-extraneous-dependencies
      this.adc = new Ads1x15(0);
    } catch (err) {
      log.warning(
        'It appears you are not running this on a Raspberry, I will feed you dummy data for the called functions',
      );

      this.sensorConnectedMockings = {};
      this.sensorValueMockings = {};

      listen('mockSensorsConnected', channel => {
        const c = !this.sensorConnectedMockings[channel];
        log.info(`Sensor ${channel} is ${c ? '' : 'dis'}connected.`);
        this.sensorConnectedMockings[channel] = c;
      });

      listen('mocksensor', ({ high, key }) => {
        this.sensorValueMockings[key] = high;
      });
    }
  }

  async read(channel) {
    /**
     * You can't read twice at the same time. If we were already reading a value, throw an error.
     */
    if (this.reading) {
      throw new Error("We can't read twice at the same time!");
    }
    this.reading = true;

    const value = await new Promise((resolve, reject) => {
      if (this.adc) {
        /**
         * If the device has an adc, use .readADCSingleEnded function.
         */
        this.adc.readADCSingleEnded(
          channel - 1,
          progGainAmp,
          samplesPerSecond,
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          },
        );
      } else {
        /**
         * If there is no adc, send a random number after 100 ms. This can be used for dummy
         */
        setTimeout(() => {
          /** If the sensor isn't connected, send interference (0-9) */
          if (!this.sensorConnectedMockings[channel])
            return resolve(Math.random() * 9);

          /** If the sensor is connected and mocked HIGH, send a high value (700 - 750). */
          if (this.sensorValueMockings[channel])
            return resolve(Math.random() * 50 + 700);

          /** If the sensor is connected and mocked LOW, send a low value (10 - 60) */
          return resolve(Math.random() * 50 + 10);
        }, 100);
      }
    });

    // console.log(value);

    // log.info(`Channel ${channel} has value ${value}`);

    this.reading = false;
    return value;
  }
}

export default new Sensors();
