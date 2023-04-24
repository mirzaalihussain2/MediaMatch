// global imports
const express = require("express");
const cors = require("cors");

// local imports
const { router } = require('./router');

// app setup
const app = express();
const PORT = 3001;

// main file
app.use(cors());
app.use(express.json());
app.use('/', router);

// running on port
app.listen(PORT, function() {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});