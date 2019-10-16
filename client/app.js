const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

module.exports = app;
