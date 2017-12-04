import ip from 'internal-ip';
import SignalProcessing from '../signal-processing'

let connection = null;

const connectionListeners = [];

export function onConnection(func) {
  connectionListeners.push(func);
}

const listeners = [];

export function listen(...args) {
  if(connection) connection.listen(...args);
  else listeners.push(args);
}

export function emit(...args) {
  if(connection) connection.emit(...args);
}

export default function(io) {
  connection = io;
  connection.on('connection', socket => {
    connectionListeners.forEach(listener => listener(socket));
  });

  listeners.forEach(args => io.on(...args));
}

onConnection(async (socket) => {
  socket.emit('info', {
    sensorsConnected: 2 + Math.floor(Math.random() * 5),
    availableActions: Math.floor(Math.random() * 5),
    sensorsCalibrated: 2 + Math.floor(Math.random() * 5),
    ip: ip.v4.sync(),
    signal: await SignalProcessing.init(),
  });

  socket.on('step', (step) => emit('step', step));
});
