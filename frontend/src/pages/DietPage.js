import React, { useState, useEffect } from 'react';
import DietForm from '../components/DietForm';

function DietPage() {
    const [dietPlan, setDietPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    const loadingMessages = [
        "Montando dieta com base nos dados",
        "Calculando madros",
        "Gerando plano alimentar",
        "Ajustando calorias",
        "Calculando refeições",
        "Validando dados",
        "Quase lá"
    ];

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
            }, 300); // Alterna a frase a cada 1.5 segundos
        } else {
            setMessageIndex(0); // Reinicia para a primeira frase quando o loading termina
        }

        return () => clearInterval(interval);
    }, [loading]);

    const handleDietSubmit = async (formData) => {
        setLoading(true); // Ativa o loading
        try {
            const response = await fetch('http://localhost:5000/api/diet/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setDietPlan(data.dietPlan);
        } catch (error) {
            console.error("Error generating diet plan:", error);
        } finally {
            setLoading(false); // Desativa o loading
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Personalized Diet</h1>
            <DietForm onSubmit={handleDietSubmit} />

            {loading ? (
                <div className="card text-bg-primary text-center mt-4 p-4 d-flex flex-col d-flex align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>{loadingMessages[messageIndex]}</p>
                </div>
            ) : (
                dietPlan && (
                    <div className="mt-4">
                        <h2>Total Daily Calories: {dietPlan.totalCalories}</h2>
                        <p>Proteins: {dietPlan.macros?.proteins}g, Carbs: {dietPlan.macros?.carbs}g, Fats: {dietPlan.macros?.fats}g</p>

                        {dietPlan.meals?.map((meal, index) => (
                            <div key={index} className="mt-3">
                                <h3>{meal.name} - {meal.calories} kcal</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Food</th>
                                            <th>Quantity</th>
                                            <th>Proteins (g)</th>
                                            <th>Carbs (g)</th>
                                            <th>Fats (g)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meal.foods?.map((food, foodIndex) => (
                                            <tr key={foodIndex}>
                                                <td>{food.name}</td>
                                                <td>{food.quantity}</td>
                                                <td>{food.macros?.proteins}</td>
                                                <td>{food.macros?.carbs}</td>
                                                <td>{food.macros?.fats}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default DietPage;
