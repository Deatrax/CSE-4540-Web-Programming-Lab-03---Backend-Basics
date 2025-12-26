const User = require('../models/userModel');
const Trainer = require('../models/trainerModel');
const Schedule = require('../models/scheduleModel');

// --- USER CONTROLLERS ---

// @desc Get all users (with filters)
// @route GET /api/users
const getUsers = async (req, res) => {
    try {
        // [cite: 25] Optional filters: active status, membership type
        const { active, membershipType } = req.query;
        const query = {};
        if (active) query.active = active === 'true';
        if (membershipType) query.membershipType = membershipType;

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create new user
// @route POST /api/users
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body); // [cite: 24]
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- TRAINER CONTROLLERS ---

// @desc Get all trainers
// @route GET /api/trainers
const getTrainers = async (req, res) => {
    try {
        // [cite: 39] Optional filters: specialization
        const { specialization } = req.query;
        const query = {};
        if (specialization) query.specialization = specialization;

        const trainers = await Trainer.find(query);
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create new trainer
// @route POST /api/trainers
const createTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.create(req.body); // [cite: 38]
        res.status(201).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- COMPLEX: WORKOUT SCHEDULING SYSTEM [cite: 46] ---

// @desc Schedule a workout
// @route POST /api/schedule
const scheduleWorkout = async (req, res) => {
    const { userId, trainerId, workoutType, scheduledTime } = req.body;

    try {
        // 1. Validate User & Membership [cite: 53, 63]
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.membershipType === 'basic') {
            return res.status(403).json({ 
                message: "Access Denied. Scheduling is for Premium and Elite members only." 
            });
        }

        // 2. Validate Trainer Availability [cite: 52, 64]
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) return res.status(404).json({ message: "Trainer not found" });

        if (!trainer.available) {
            return res.status(400).json({ message: "Trainer is currently unavailable." });
        }
        
        // BONUS: Check for conflicting schedules [cite: 54, 65]
        const existingSession = await Schedule.findOne({
            trainer: trainerId,
            scheduledTime: new Date(scheduledTime)
        });
        if(existingSession) {
            return res.status(409).json({ message: "Trainer is already booked at this time." });
        }

        // 3. Create Schedule Record [cite: 66]
        const session = await Schedule.create({
            user: userId,
            trainer: trainerId,
            workoutType,
            scheduledTime
        });

        res.status(201).json({
            success: true,
            data: session,
            message: "Workout scheduled successfully!" // [cite: 67]
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers, createUser,
    getTrainers, createTrainer,
    scheduleWorkout
};