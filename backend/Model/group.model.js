const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    colour: {
        type: String
    },
    tabs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'tabModel'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    groupCode: {
        type: String
    }
})

const groupModel = mongoose.model("groupModel", groupSchema);

module.exports = groupModel;
