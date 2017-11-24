import express from 'express';
import chromeLauncher from 'chrome-launcher';
import SocketIo from 'socket.io';
import UI from './ui';

const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10);
const socketPort = process.env.SOCKET_PORT || 3033;

const app = express();

// initialize socket.io
const server = app.listen(socketPort);
const io = SocketIo.listen(server);

app.use(UI);

app.listen(port, () => {
  console.log(`✅  server started on port: ${port}`); // eslint-disable-line
  if(process.argv[2] === 'prod') {
    chromeLauncher.launch({
      startingUrl: `http://localhost:${port}`,
      chromeFlags: ['--disable-translate', '--kiosk', '--incognito'],
    });
  }
});

io.on( "connection", (socket) => {
  console.info(socket);
});


// app.get('/', (req, res) => {
//   res.json({
//     text: 'Hello world!',
//   });
// });
