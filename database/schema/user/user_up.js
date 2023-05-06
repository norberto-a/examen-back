const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    account_money: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

// modelo de la base de datos

const User = mongoose.model('User', userSchema,'userps');

module.exports = User;