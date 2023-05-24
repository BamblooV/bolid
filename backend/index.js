const express = require('express');
const cors = require('cors');
const data = require('./data/events.json');

const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
  res.json(data);
})

app.listen(port, () => {
  console.log(`Server started at ${port}`);
})