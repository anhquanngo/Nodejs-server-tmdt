const mongoose = require("mongoose")
require("../app/model/product")
require("../app/model/category")
require("../app/model/user")
const urls = "mongodb://localhost:27017/mongo_test"

mongoose.connect(urls)