import EventEmitter from "events";
import signalProcessing from '../signal-processing';

class SignalInterpretation extends EventEmitter{

   constructor() {
       signalProcessing.addListener('recieved-signal', (sensor, value) => {
           
       })
   }
}