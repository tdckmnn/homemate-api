const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongooseHidden = require('mongoose-hidden')();

const DateSchema = mongoose.Schema({
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
            start: {
                type: String,
                required: true,
            },
            end: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: false,
                default: "CREATED"
            },
            bookedBy: {
                type: String,
                required: false,
            },
        }
    ],
    invitations: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

DateSchema.plugin(mongooseHidden)

module.exports = mongoose.model('dates', DateSchema, 'date');