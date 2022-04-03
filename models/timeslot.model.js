const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongooseHidden = require('mongoose-hidden')();

const DateSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4(),
        hide: false,
        hideJSON: false
    },
    type: {
        type: String,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    timeslots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Timeslot",
            required: true
        }
    ]
});

UserSchema.plugin(mongooseHidden)

module.exports = mongoose.model('dates', DateSchema, 'date');