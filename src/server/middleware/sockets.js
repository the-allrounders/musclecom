let socket = null;

const connectionListeners = [];

const listeners = [];

export function onConnection(func) {
  connectionListeners.push(func);

  // If an connection was already made, invoke the function directly.
  if(socket) func();
}

export function listen(...args) {
  listeners.push(args);
  if(socket) socket.listen(...args);
}

const emitsToSend = [];
export function emit(...args) {
  if(socket) socket.emit(...args);
  else emitsToSend.push(args);
}

export default function(io) {
  io.on('connection', newSocket => {

    if(socket) console.warn('A new socket is overriding the other socket! Make sure you only have one connection.');
    else console.warn('Socket connected.');

    socket = newSocket;

    // Send all emits that were sent to queue.
    emitsToSend.forEach(emitArgs => socket.emit(...emitArgs));

    // Invoke all listeners.
    connectionListeners.forEach(listener => listener());

    // Re-initiate all previously declared listeners
    listeners.forEach(args => socket.listen(...args));

    // On disconnect, remove the socket.
    socket.on('disconnect', () => {
      if(socket !== newSocket) return;
      console.warn('The socket is disconnected.');
      socket = null;
    });
  });
}

// setInterval(() => {
setTimeout(() => {
  emit('info', {
    sensorsConnected: 2 + Math.floor(Math.random() * 5),
    availableActions: Math.floor(Math.random() * 5),
    sensorsCalibrated: 2 + Math.floor(Math.random() * 5),
  });
}, 0);
