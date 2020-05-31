const express = require("express");
const app = express();
const path = require("path");

app.use("/access", express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("../routers/api"));
app.use("/", require("../routers/web"));

module.exports = app;
