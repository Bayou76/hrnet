import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
  return (
    <div className="container">
      <h1>HRNET</h1>
      <div className="HP-buttons">
        <Link to="/employee-list" className='form-link'>
          Liste des Employés
        </Link>
        <Link to="/create-employee" className='form-link'>
          Créer un Employé
        </Link>
      </div>
    </div>
  );
};

export default HomePage;