const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trainer' 
    },
    workoutType: {
        type: String,
        required: true 
    },
    scheduledTime: {
        type: Date,
        required: true 
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