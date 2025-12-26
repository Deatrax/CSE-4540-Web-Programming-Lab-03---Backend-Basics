const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // [cite: 56]
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trainer' // [cite: 57]
    },
    workoutType: {
        type: String,
        required: true // [cite: 59]
    },
    scheduledTime: {
        type: Date,
        required: true // [cite: 58]
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled' // [cite: 60]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);