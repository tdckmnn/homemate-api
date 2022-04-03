const mongoose = require('mongoose');
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
                default: "FREE"
            },
            bookedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
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
        required: true
    }
});

DateSchema.plugin(mongooseHidden)

DateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.user_id }
});

module.exports = mongoose.model('Date', DateSchema, 'date');