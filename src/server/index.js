import { Server } from 'http';
import express from 'express';
import SocketIo from 'socket.io';
import sockets from './middleware/sockets';
import ui from './middleware/ui';

const chromeLauncher = require('chrome-launcher');

const app = express();
const server = Server(app);
const io = SocketIo(server);

// Sockets middleware
sockets(io);

// Webpack middleware
app.use(ui);

server.listen(6969, () => {
  console.log(`✅  server started on port 6969`); // eslint-disable-line
  if(process.argv[2] === 'prod') {
    chromeLauncher.launch({
      startingUrl: `http://localhost:6969`,
      chromeFlags: ['--disable-translate', '--kiosk', '--incognito'],
    });
  }
});
