import express from 'express';
import chromeLauncher from 'chrome-launcher';
import UI from './ui';

const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10);

const app = express();

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

// app.get('/', (req, res) => {
//   res.json({
//     text: 'Hello world!',
//   });
// });
