import express from 'express';

const chromeLauncher = require('chrome-launcher');

const app = express();

app.get('/', (req, res) => {
  res.json({
    text: 'Hello world!',
  });
});

app.listen(6969, () => {
  if (process.argv[2] === 'prod') {
    chromeLauncher.launch({
      startingUrl: 'http://localhost:6969',
      chromeFlags: ['--disable-translate', '--kiosk', '--incognito'],
    });
  }
});
