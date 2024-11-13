const { generateDietPlan } = require('../services/openAIService');

exports.generateDiet = async (req, res) => {
    const { weight, height, age, goal } = req.body;
    try {
        const dietPlan = await generateDietPlan(weight, height, age, goal);
        res.json({ dietPlan });
    } catch (error) {
        // Exibe o erro real com a mensagem e os detalhes
        console.error(error); // Loga o erro no servidor para depuração
        res.status(500).json({ 
            error: 'Error generating diet plan', 
            message: error.message, // Detalhes do erro
            stack: error.stack // Opcional: Mostra a pilha de execução do erro
        });
    }
};
