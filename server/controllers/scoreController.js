const Score = require('../models/scoreModel');

// Add or update a score
exports.addScore = async (req, res) => {
    try {
        const { email, score } = req.body;
        let existingScore = await Score.findOne({ email });
        
        if (existingScore) {
            existingScore.score += score;
            await existingScore.save();
            res.status(200).json(existingScore);
        } else {
            const newScore = new Score({ email, score });
            await newScore.save();
            res.status(201).json(newScore);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding or updating score', error });
    }
};

// Get the leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Score.find().sort({ score: -1 });
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};
