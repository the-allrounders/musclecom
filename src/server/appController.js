import EventEmitter from 'events';
import { listen } from './middleware/sockets';
import log from './log';

/**
 * The AppController holds the current state of the app.
 * It knows which step it is at. The current step is sent in the signal-api,
 * and also used in the signal-processing.
 * It is changed when one of the sockets sends the 'step' event.
 */
class AppController extends EventEmitter {
  constructor() {
    super();

    /**
     * Available steps:
     * 0 - Waiting for remote
     * 1 - Waiting for number of sensors confirmation
     * 2 - Waiting for sensor calibrations
     * 3 - MuscleCom is setup and running.
     *
     * @type {number}
     */
    this.step = 0;
  }

  setStep(newStep) {
    this.step = newStep;
    log.info(`The app is now in step ${newStep}`);
    this.emit('step-changed', newStep);
  }

  /**
   * If the sensor connectivity changes, we need to assure we're in step 0 or 1.
   */
  assureSensorStep() {
    if (this.step > 1) {
      this.setStep(0);
    }
  }
}

const controller = new AppController();

export default controller;

listen('step', newStep => {
  controller.setStep(newStep);
});
