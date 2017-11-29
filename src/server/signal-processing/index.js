import EventEmitter from 'events';

class SignalProcessing extends EventEmitter {

    async init() {
        return {
            numOfSensors: this.numOfSensors,
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
            const adc = new Ads1x15(0);
            console.info(adc);
            this.adc = adc;
        } catch(err) {
            console.info('It appears you are not running this on a Raspberry, I will feed you dummy data for the called functions');
            this.dummy = true;
        }

        // Set initial number of signals / sensors.
        this.numOfSensors = this.checkChannels();

        // ** How to send a signal to the api.**
        // @params
        // string : eventName
        // int : sensorNumber
        // bool : activation
        this.emit('recievedSignal', 3, true);

        // ** Send a amount of sensors to set within the API. **
        // @params
        // string : eventName
        // int : sensorNumber
        this.emit('numberOfSensors', this.numOfSensors);
    }

    /**
     * Read the channel for a single value
     * @param channel
     */
     readChannel(channel) {
        if(!this.dummy && !this.adc.busy) {
            const samplesPerSecond = '250'; // see index.js for allowed values for your chip
            const progGainAmp = '4096'; // see index.js for allowed values for your chip

            this.adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, (err, data) => {
                if(err) {
                    // Log the error code
                    console.error(err);
                }

                console.info(`ChannelRead: ${channel} : ${data}`);
                return data;
            });
        }

        return false
    }

    /**
     * Check how many channels are there
     *
     * @returns {*}
     */
    async checkChannels() {
        if(!this.dummy) {
            // Create an array for our sensor
            this.sensors = [];
            // Since we only use max 4 channels for our prototype we loop trough those 4 channels
            const results = [];
            for(let count = 0; count < 4; count += 1) {
                // Set basic output to negative
                // const callback = (value) =>{
                //     if(value > 0) {
                //         // value = -1 when adc is busy
                //         // value = > 0 when value is returned
                //         // value = 0 means no sensor is connected to this port
                //         this.sensors.push(count);
                //     }
                // };

                // Start reading the channel and break only if a value has returned
                results.push(this.readChannel(count));
            }
            console.info(await Promise.all(results));
            return this.sensors.length;
        }

        return SignalProcessing.getRandomInt(1,4);
    };

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
