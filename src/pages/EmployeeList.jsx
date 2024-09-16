import React from 'react';
import { Link } from "react-router-dom";
import EmployeeTable from '../components/EmployeeTable'; 
import './EmployeeList.css';

const EmployeeList = () => {
  return (
    <div className="container">
      <h1>Current Employees</h1>
      <EmployeeTable />
      <div className="link-container">
        <Link to="/" className="form-link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
