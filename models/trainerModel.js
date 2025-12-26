const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    specialization: {
        type: [String],
        enum: ['yoga', 'cardio', 'strength', 'pilates', 'cross-fit'] // [cite: 32]
    },
    experienceYears: {
        type: Number,
        min: 1 // [cite: 33]
    },
    hourlyRate: {
        type: Number,
        required: true,
        min: 10 // [cite: 34]
    },
    available: {
        type: Boolean,
        default: true // [cite: 35]
    },
    certifications: {
        type: [String] // [cite: 36]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);