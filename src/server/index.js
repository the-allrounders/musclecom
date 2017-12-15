import { Server } from 'http';
import express from 'express';
import SocketIo from 'socket.io';
import mongoose from 'mongoose';
import { promisify } from 'util';
import sockets from './middleware/sockets';
import ui from './middleware/ui';
import setDummyData from './db/dummy';
import signalApi from './signal-api';

const chromeLauncher = require('chrome-launcher');

// Setup a Promise library for mongoose.
mongoose.Promise = global.Promise;

// Create an express app.
const app = express();

// Create an express server.
const server = Server(app);

// Create socketIo listener for this server.
const io = SocketIo(server);

// Save this socket to the global sockets function, so it can be used anywhere.
sockets(io);

// Webpack middleware
app.use(ui);

(async () => {
  // Connect to mongodb
  await mongoose.connect('mongodb://127.0.0.1:27017/musclecomdb', {
    useMongoClient: true,
  });

  // Insert dummy data if there is no data available yet.
  await setDummyData();

  // Make sure the signalAPI is ready to go.
  await signalApi.init();

  // Bind the server to port 6969
  await promisify(server.listen)(6969);
  console.log(`✅  server started on port 6969`);

  // Start the chrome browser on the raspberry pi.
  if (process.argv[2] === 'prod') {
    chromeLauncher.launch({
      startingUrl: `http://localhost:6969`,
      chromeFlags: ['--disable-translate', '--kiosk', '--incognito'],
      chromePath: '/usr/bin/chromium-browser',
    });
  }
})();
