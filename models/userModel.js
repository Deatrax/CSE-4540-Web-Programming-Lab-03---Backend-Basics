const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    age: {
        type: Number,
        min: 16,
        max: 100 // [cite: 18]
    },
    membershipType: {
        type: String,
        enum: ['basic', 'premium', 'elite'],
        default: 'basic' // [cite: 19]
    },
    joinDate: {
        type: Date,
        default: Date.now // [cite: 20]
    },
    active: {
        type: Boolean,
        default: true // [cite: 21]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);