import io from 'socket.io-client';

const socket = io(window.location.origin);

export default socket;

const keysWithValues = {};

const emitKey = (high, { key, code, ctrlKey }) => {
  // Only emit digits and numpad keys.
  if (code.substr(0, 5) !== 'Digit' && code.substr(0, 6) !== 'Numpad') return;

  if (ctrlKey && high) {
    // If the control key is pressed, mock the number of sensors connected.
    socket.emit('mockSensorsConnected', parseInt(key, 10));
  } else if (!ctrlKey && !(high && keysWithValues[key])) {
    // If the cntrlKey was not pressed, mock the sensor value (high / low).
    keysWithValues[key] = high;
    socket.emit(`mocksensor`, {
      high,
      key: parseInt(key, 10),
    });
  }
};

window.addEventListener('keydown', e => emitKey(1, e));
window.addEventListener('keyup', e => emitKey(0, e));
