"use strict";
const dotenv = require("dotenv");
dotenv.config();

const model = require("./src/models/index");

const express = require("express");
const app = express();

const home = require("./src/routes/home/index");

app.use(express.json());
app.use("/", home);

module.exports = app;
