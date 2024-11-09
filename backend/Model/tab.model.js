const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    favIconUrl: {
        type: String
    }
})

const tabModel = mongoose.model("tabModel", tabSchema);

module.exports = tabModel;
