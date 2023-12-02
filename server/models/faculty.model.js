const mongoose = require('mongoose');


const facultySchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
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
    role: {
        type: String,
        required: true
    },

},{timestamps: true})


const subjectSChema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, { timestamps: true })


const rateSchema = mongoose.Schema({
    rate: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true})


const Faculty = mongoose.model('Faculty', facultySchema);
const Subject = mongoose.model('Subject', subjectSChema);
const Rate = mongoose.model('Rate', rateSchema);

module.exports = {
    Faculty,
    Subject,
    Rate,
};