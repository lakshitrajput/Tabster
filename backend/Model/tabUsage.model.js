const mongoose = require("mongoose");

const tabUsageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    favIconUrl: {
        type: String
    },
    lastUsed: {
        type: Date
    },
    totalUsedTime: {
        type: Number,
        default: 0
    },
    usage: [{
        date: {
            type: Date,
            required: true
        },
        usedTime: {
            type: Number,
            default: 0
        }
    }],
    visitCount: {
        type: Number,
        default: 0
    }
});

const tabUsageModel = mongoose.model("tabUsageModel", tabUsageSchema);

module.exports = tabUsageModel;