const { generateWorkoutPlan } = require('../services/openAIService');

exports.generateWorkout = async (req, res) => {
    const { frequency, experience, goal } = req.body;
    try {
        const workoutPlan = await generateWorkoutPlan(frequency, experience, goal);
        res.json({ workoutPlan });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error generating workout plan' });
    }
};
