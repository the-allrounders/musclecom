import { Server } from 'http';
import express from 'express';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';
import sockets from './middleware/sockets';
import ui from './middleware/ui';
import setDummyData from './db/dummy';
import signalApi from './signal-api';

const chromeLauncher = require('chrome-launcher');

const app = express();
const server = Server(app);
const io = SocketIo(server);

// Sockets middleware
sockets(io);

signalApi.setupConnection();

mongoose.connect('mongodb://127.0.0.1:27017/musclecomdb');
mongoose.Promise = global.Promise;

setDummyData();

// Webpack middleware
app.use(ui);

server.listen(6969, () => {
  console.log(`✅  server started on port 6969`); // eslint-disable-line
  if(process.argv[2] === 'prod') {
    chromeLauncher.launch({
      startingUrl: `http://localhost:6969`,
      chromeFlags: ['--disable-translate', '--kiosk', '--incognito'],
      chromePath: '/usr/bin/chromium-browser',
    });
  }
});
