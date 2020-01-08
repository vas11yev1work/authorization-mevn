const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    login: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', schema);
