import EventEmitter from 'events';
import {promisify} from 'util';

class SignalProcessing extends EventEmitter {

    async init() {
        return {
            numOfSensors: this.sensors.length,
        };
    }

    constructor() {
        console.info('Starting signal processing');
        super();

        (async () => {
            // Dummy mode off
            this.dummy = false;

            // Try to import the module that allows us to read the adc
            // If this fails return dummy data
            try {
                const Ads1x15 = require('node-ads1x15'); // eslint-disable-line global-require
                this.adc = new Ads1x15(0);
            } catch(err) {
                console.error(err);
                console.info('It appears you are not running this on a Raspberry, I will feed you dummy data for the called functions');
                this.dummy = true;
            }

            // Set initial number of signals / sensors.
            this.numOfSensors = await this.checkChannels();
            console.info(`Number of sensors final: ${this.numOfSensors}`)

            this.startDataCollection();
            this.calibrateMin(1);
        })();
    }

    /**
     * Read the channel for a single value
     *
     * @param channel
     * @param callback
     */
    readChannel(channel) {
        console.debug(`Reading channel: ${channel}`);
        if(!this.dummy && !this.adc.busy) {
            return new Promise(async (resolve,reject) => {
                const samplesPerSecond = '250'; // see index.js for allowed values for your chip
                const progGainAmp = '4096'; // see index.js for allowed values for your chip

                await this.adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, (err, data) => {
                    if(err) {
                        // Log the error code
                        console.error(err);
                    }

                    console.info(`Channel Read: ${channel} : ${data}`);
                    this.currentval = data;
                    resolve(this.currentval);
                });
            });
        }

        console.debug('Device busy');
        return new Promise((resolve, reject) => {
            resolve(false);
        });
    }

    /**
     * Check how many channels are there
     *
     * @returns {*}
     */
    checkChannels() {
        return new Promise(async (resolve, reject) => {
            console.info('Checking number of sensors');
            this.sensors = [];
            if(!this.dummy) {
                // Create an array for our sensor
                // Set a default counter
                const results = [];

                for(let count = 0; count < 4; count += 1) {
                    // Start reading the channel and break only if a value has returned
                    const channel_value = await this.readChannel(count);
                    if(channel_value > 0) {
                        this.sensors.push({'channel': count, 'min': 3000, 'max': 0, 'value': 0});
                    }
                }

                resolve(this.sensors.length);
            }

            return SignalProcessing.getRandomInt(1, 4);
        });
    };

    calibrateMin(channel) {
        let count = 0;
        const objIndex = this.sensors.findIndex((obj => obj.channel === channel));
        const intervalID = setInterval(async () => {
            console.debug(`Calibration_counter:${count}`)
            const value = await this.readChannel(channel);

            if(value > 0) {
                console.debug(`SensorMin: ${this.sensors[objIndex].min}`);
                if(value < this.sensors[objIndex].min) {
                    this.sensors[objIndex].min = value;
                    console.debug(`minval: ${value}`);
                }
            }

            if(count === 25) {
                console.debug('Clearing calibration interval')
                clearInterval(intervalID);
            }
            count += 1;
        }, 10);
    }

    calibrateMax(channel) {
        let count = 0;
        const objIndex = this.sensors.findIndex((obj => obj.channel === channel));
        const intervalID = setInterval(async () => {
            console.debug(`Calibration_counter:${count}`)
            const value = await this.readChannel(channel);

            if(value > 0) {
                console.debug(`SensorMax: ${this.sensors[objIndex].max}`);
                if(value > this.sensors[objIndex].max) {
                    this.sensors[objIndex].max = value;
                    console.debug(`maxval: ${value}`);
                }
            }

            if(count === 25) {
                console.debug('Clearing calibration interval')
                clearInterval(intervalID);
            }
            count += 1;
        }, 10);
    }

    async startDataCollection() {
        for(let count = 0; count < this.sensors.length; count += 1) {
            // while(true) {
            //     let value = await this.readChannel(this.sensors[count].channel);
            //
            //     if (value > 0) {
            //         //Saving to database
            //         console.info(`Saving:${value}`);
            //     }
            // };
        }
    }

    /**
     * Pause
     */
    pauseDataCollection() {
        clearInterval(this.dataInterval);
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
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default new SignalProcessing();
