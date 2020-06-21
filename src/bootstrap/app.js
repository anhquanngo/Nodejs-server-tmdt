const express = require("express")
const app = express();
const body_parser = require("body-parser")
const path = require("path")
const session = require("express-session")
require('../libs/mongo-db')

app.use(session({
    secret: 'vietpro',
    resave: false,

}))

app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

app.use("/asset", express.static(path.join(__dirname, "..", "public")))
console.log(path.join(__dirname, "..", "public"));

app.set("views", path.join(__dirname, "..", "app", "views"))
app.set("view engine", "ejs")

app.use("/api", require("../routers/api"))
app.use("/", require("../routers/web"))

module.exports = app