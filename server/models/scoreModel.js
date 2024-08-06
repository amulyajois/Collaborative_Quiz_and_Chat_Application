const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true },
});

module.exports = mongoose.model('Score', scoreSchema);
