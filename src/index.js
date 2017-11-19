import express from 'express';
import signalProessing from './server/signal-processing';

const app = express();

app.get('/', (req, res) => {
  res.json({
    text: 'Hello world!'
  });
});

app.listen(6969);