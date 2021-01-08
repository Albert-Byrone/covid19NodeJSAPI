const mongoose = require('mongoose');

const caseScheme = new mongoose.Schema({
    date : {
        type: Date,
        default: Date.now()
    },
    country : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    deaths : {
        type: Number,
        required: true
    },
    cases : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Case', caseScheme)