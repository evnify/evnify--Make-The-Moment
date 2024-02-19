const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const packagesRoute = require("./routes/packagesRoute");
const employeesRoute = require("./routes/employeesRoute");


app.use(express.json());

const dbConfig = require("./db");

app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/packages", packagesRoute);
app.use("/api/employees", employeesRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server running on port ${port} with nodemon`)
);