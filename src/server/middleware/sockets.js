let socket = null;

export default function(io) {
  io.on('connection', newSocket => {
    if(socket) console.warn('A new socket is overriding the other socket! Make sure you only have one connection.');
    socket = newSocket;
    socket.on('disconnect', () => {
      if(socket !== newSocket) return;
      console.warn('The socket is disconnected.');
      socket = null;
    });
  });
}

export function listen(...args) {
  if(socket) socket.listen(...args);
}

export function emit(...args) {
  if(socket) socket.emit(...args);
}
