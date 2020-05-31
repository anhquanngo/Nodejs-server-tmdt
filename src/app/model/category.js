const mongoose = require("mongoose")

const categotyModel = new mongoose.Schema({
    cat_name: String
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

categotyModel.virtual("product", {
    ref: "Product",
    localField: '_id',
    foreignField: 'cat_id',
})

mongoose.model("Category", categotyModel, "category");