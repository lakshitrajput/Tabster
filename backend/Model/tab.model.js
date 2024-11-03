const mongoose = require("mongoose");

const tabSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    favIconUrl: {
        type: String
    },
    isBookmarked: {
        type: Boolean,
        default: false
    }
})

const tabModel = mongoose.model("tabModel", tabSchema);

module.exports = tabModel;
