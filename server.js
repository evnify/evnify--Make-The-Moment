const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.json());

const dbConfig = require("./db");

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server running on port ${port} with nodemon`)
);