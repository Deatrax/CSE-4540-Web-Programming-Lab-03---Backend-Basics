const express = require('express');
const router = express.Router();
const {
    getUsers, createUser,
    getTrainers, createTrainer,
    scheduleWorkout
} = require('../controllers/gymControllers');

router.route('/users').get(getUsers).post(createUser);


router.route('/trainers').get(getTrainers).post(createTrainer);

router.post('/schedule', scheduleWorkout);

module.exports = router;