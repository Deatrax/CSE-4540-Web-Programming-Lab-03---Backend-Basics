const express = require('express');
const router = express.Router();
const {
    getUsers, createUser,
    getTrainers, createTrainer,
    scheduleWorkout
} = require('../controllers/gymControllers');

// User Routes [cite: 22]
router.route('/users').get(getUsers).post(createUser);

// Trainer Routes [cite: 37]
router.route('/trainers').get(getTrainers).post(createTrainer);

// Scheduling Route [cite: 46]
router.post('/schedule', scheduleWorkout);

module.exports = router;