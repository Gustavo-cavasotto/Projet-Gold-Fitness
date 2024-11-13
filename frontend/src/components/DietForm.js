import React, { useState } from 'react';

function DietForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        goal: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="container mt-5">
            {/* Card */}
            <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
                <div className="card-header text-center">
                    <h4>Diet Plan Generator</h4>
                </div>
                
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="weight"
                                className="form-control"
                                placeholder="Weight (kg)"
                                onChange={handleChange}
                                value={formData.weight}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="height"
                                className="form-control"
                                placeholder="Height (cm)"
                                onChange={handleChange}
                                value={formData.height}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="age"
                                className="form-control"
                                placeholder="Age"
                                onChange={handleChange}
                                value={formData.age}
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                name="goal"
                                className="form-select"
                                onChange={handleChange}
                                value={formData.goal}
                            >
                                <option value="">Select Goal</option>
                                <option value="weight_loss">Weight Loss</option>
                                <option value="muscle_gain">Muscle Gain</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Generate Diet
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DietForm;
