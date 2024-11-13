import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DietPage from './pages/DietPage';
import WorkoutPage from './pages/WorkoutPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Router>
        {/* Header com Navbar do Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Gold Fitness</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/diet">Plano de Dieta</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workout">Plano de Treino</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Definição das Rotas */}
        <Routes>
          <Route path="/diet" element={<DietPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
