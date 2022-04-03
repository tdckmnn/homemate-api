const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongooseHidden = require('mongoose-hidden')();

const InvitationsSchema = new mongoose.Schema({ user: String });

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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Timeslot",
            required: true
        }
    ],
    invitations: [InvitationsSchema],
    user_id: {
        type: String,
        hideJSON: true
    }
});

DateSchema.plugin(mongooseHidden)

module.exports = mongoose.model('dates', DateSchema, 'date');