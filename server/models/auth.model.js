const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // photo: {
    //     type: String,
    //     required: true
    // },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },

}, { timestamps: true })


const User = mongoose.model('User', userSchema);

module.exports = User;