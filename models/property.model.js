const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongooseHidden = require('mongoose-hidden')();

const PropertySchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4(),
    },
    name: {
        type: String,
    },
    adress: {
        street: {
            type: String,
        },
        street_number: {
            type: String,
        },
        postal_code: {
          type: String,  
        },
        city: {
            type: String
        }
    },
    details: {
        size: {
            type: String,
        },
        rooms: {
            type: String,
        }
    },
    user_id: {
        type: String,
        hideJSON: true
    }
});

PropertySchema.plugin(mongooseHidden)

PropertySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id, delete ret.user_id }
});

module.exports = mongoose.model('properties', PropertySchema, 'property');