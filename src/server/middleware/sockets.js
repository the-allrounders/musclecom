/**
 * The sockets connection
 */
let io = null;

/**
 * List of all connected sockets.
 */
const sockets = [];

/**
 * An array of listeners to new connections
 */
const connectionListeners = [];

/**
 * An array of listeners to all sockets.
 */
const listeners = [];

/**
 * Can be used to listen to a new socket connection.
 *
 * @param func function
 *   This function gets called every time a new socket connection is made.
 */
export function onConnection(func) {
  connectionListeners.push(func);
}

/**
 * Can be used to listen to events.
 */
const listen = (...args) => {
  listeners.push(args);
  sockets.forEach(socket => socket.on(...args));
};
export { listen };

/**
 * Can be used to emit something to all sockets.
 */
export function emit(...args) {
  if (io) io.emit(...args);
}

/**
 * This should only be used once, when the io server is created.
 */
export default function(newIo) {
  io = newIo;
  io.on('connection', socket => {
    connectionListeners.forEach(listener => listener(socket));
  });
}

/**
 * This uses our own 'onConnection' function to keep track of connections and attach listeners.
 */
onConnection(socket => {
  // Keep the sockets array up-to-date.
  sockets.push(socket);
  socket.on('disconnect', () => sockets.splice(sockets.indexOf(socket), 1));

  // Attach all listeners.
  listeners.forEach(args => socket.on(...args));
});
