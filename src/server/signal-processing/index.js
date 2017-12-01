import EventEmitter from 'events';

class SignalProcessing extends EventEmitter {

    async init() {
        return {
            numOfSensors: this.sensors.length,
        };
    }

    constructor() {
        console.info('Starting signal processing');
        super();
        // Dummy mode off
        this.dummy = false;

        // Try to import the module that allows us to read the adc
        // If this fails return dummy data
        try {
            const Ads1x15 = require('node-ads1x15'); // eslint-disable-line global-require
            this.adc = new Ads1x15(0);
        } catch(err) {
            console.info('It appears you are not running this on a Raspberry, I will feed you dummy data for the called functions');
            this.dummy = true;
        }

        const setupCallback = (data) => {
            console.info(data);
            this.calibrateMin(1);
            // setInterval(this.handleData, 1000);
        };

        // Set initial number of signals / sensors.
        this.checkChannels(setupCallback);
    }

    /**
     * Read the channel for a single value
     *
     * @param channel
     * @param callback
     */
    readChannel(channel, callback) {
        console.info(`Reading channel: ${channel}`);
        if(!this.dummy && !this.adc.busy) {
            const samplesPerSecond = '250'; // see index.js for allowed values for your chip
            const progGainAmp = '4096'; // see index.js for allowed values for your chip

            return this.adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, (err, data) => {
                if(err) {
                    // Log the error code
                    console.error(err);
                }

                console.info(`Channel Read: ${channel} : ${data}`);
                callback(data);
            });
        }

        console.info('Device busy');
        return callback(false);
    }

    /**
     * Check how many channels are there
     *
     * @returns {*}
     */
    checkChannels(callback) {
        console.info('Checking number of sensors');
        if(!this.dummy) {
            // Create an array for our sensor
            this.sensors = [];
            // Set a default counter
            let count = 0;

            // Set a private function to use as callbackg
            /* eslint-disable */
            const channelCallback = (value) => {
                // if (!value) { // value == false when adc is busy
                //     // Something happend retry the channel
                //     this.readChannel(count, callback)
                // } else
                if(value > 0) {
                    // value == > 0 when value is returned
                    // value == 0 means no sensor is connected to this channel
                    this.sensors.push({'channel':'count', 'min': 3000, 'max': 0});
                }

                // Up the counter
                count += 1;

                // Since we only have four sensors we break after this
                if(count >= 4) {
                    console.info(`Amount of sensors: ${this.sensors.length}`);

                    // ** Send a amount of sensors to set within the API. **
                    // @params
                    // string : eventName
                    // int : sensorNumber
                    this.emit('numberOfSensors', this.sensors.length);

                    return callback(this.sensors.length);
                }

                console.info(count);
                // Start reading channels
                this.readChannel(count, channelCallback)
            };
            /* eslint-enable */

            // Start reading the channel and break only if a value has returned
            this.readChannel(count, channelCallback)
        }
        return callback(SignalProcessing.getRandomInt(1, 4));
    };

    calibrateMin(channel) {
        let count = 0;
        const objIndex = this.sensors.findIndex((obj => obj.channel === channel))
        console.info(`objectIndex: ${objIndex}`);
        const intervalID = setInterval(() => {
            const callback = (value) => {
                if(value > 0) {
                    if(value < this.sensors[objIndex].min) {
                        this.sensors[objIndex].min = value;
                        console.info(`minval: ${value}`);
                    }
                }
            };

            this.readChannel(channel,callback);

            if(count === 50) {
                window.clearInterval(intervalID);
            }
            count += 1;
        }, 100);
    }

    calibrateMax(channel) {
        const objIndex = this.sensors.findIndex((obj => obj.channel === channel))
        console.info(`Calibrating ${channel} on object ${objIndex}`);
    }

    handleData() {
        const objIndex = this.sensors.findIndex((obj => obj.channel === channel))
        console.info(`handling data on object ${objIndex}`);
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
    static getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default new SignalProcessing();
