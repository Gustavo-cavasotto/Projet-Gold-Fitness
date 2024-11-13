const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Exportar a instância 'openai' e a função 'generateDietPlan' de uma vez só
module.exports = {
    openai,
    generateDietPlan: async (weight, height, age, goal) => {
        try {
        console.log('teste', process.env.OPENAI_API_KEY)

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: `Você é um especialista em nutrição.` },
                { 
                    role: "user", 
                    content: `Crie um plano de dieta em formato JSON para uma pessoa com ${weight}kg, ${height}cm de altura, ${age} anos, cujo objetivo é ${goal}. O JSON deve incluir:
                        {
                            "totalCalories": número,
                            "macros": {
                                "proteins": número,
                                "carbs": número,
                                "fats": número
                            },
                            "meals": [
                                {
                                    "name": "Nome da refeição",
                                    "calories": número,
                                    "foods": [
                                        {
                                            "name": "Nome do alimento",
                                            "quantity": "Quantidade do alimento",
                                            "macros": {
                                                "proteins": número,
                                                "carbs": número,
                                                "fats": número
                                            }
                                        }
                                    ]
                                }
                            ]
                        }`
                }
            ]
        });
        
        const dietPlanJson = JSON.parse(response.choices[0].message.content);
        return dietPlanJson;
        
        } catch (error) {
            console.error("Erro ao gerar plano de dieta:", error);
            throw error;
        }
    },
};


exports.generateWorkoutPlan = async (frequency, experience, goal) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // ou "gpt-4" se disponível e compatível
            messages: [
                {
                    role: "system",
                    content: `Você é um especialista em fitness.`,
                },
                {
                    role: "user",
                    content: `Crie um plano de treino para uma pessoa com nível de experiência ${experience}, frequência de treino de ${frequency} dias por semana, com o objetivo de ${goal}.`,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao gerar plano de treino:", error);
        throw error;
    }
};
