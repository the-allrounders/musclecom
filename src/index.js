import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({
    text: 'Hello world!',
  });
});

app.listen(6969);
