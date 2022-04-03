const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongooseHidden = require('mongoose-hidden')();

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        hideJSON: true
    },
    type: {
        type: String,
        required: true
    }
});

UserSchema.plugin(mongooseHidden)

module.exports = mongoose.model('User', UserSchema, 'user');