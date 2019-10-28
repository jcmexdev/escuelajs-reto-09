const express = require('express');
const app = express();
const MongoConnect = require('./lib/mongo');
const DB = new MongoConnect();

const { config } = require('./config');
const platziStore = require('./routes');

app.get('/', (req, res) => {
  let userInfo = req.header('user-agent');
  res.send(`UserInfo: ${userInfo}`);
});

platziStore(app);

app.listen(config.port, err => {
  if (err) {
    console.error('Error: ', err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
  DB.connect();
});
