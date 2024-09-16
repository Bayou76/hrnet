import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "modal-rhnet-library-react";
import DatePickerComponent from "../components/DatePickerComponent";
import Dropdown from "../components/Dropdown";
import usStates from "../data/usStates";
import "./CreateEmployee.css";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    startDate: null,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "Sales",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: date }));
  };

  const handleDropdownChange = (e, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving data:", formData);
    const employees = JSON.parse(localStorage.getItem("employees"));
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));

    setIsModalOpen(true);
  };

  const modalContent = (
    <div>
      <h2>Employee Created!</h2>
    </div>
  );

  return (
    <div>
      <div className="title">HRNET</div>
      <div className="link">
        <Link to="/employee-list" className="form-link">
          View Employee List
        </Link>
      </div>
      <div className="form-container">
        <h2>Create Employee</h2>
        <form id="create-employee" onSubmit={handleSave}>
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />

          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />

          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <DatePickerComponent
            id="dateOfBirth"
            selectedDate={formData.dateOfBirth}
            onDateChange={(date) => handleDateChange(date, "dateOfBirth")}
            placeholder="Select Date of Birth"
            className="form-input"
          />

          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <DatePickerComponent
            id="startDate"
            selectedDate={formData.startDate}
            onDateChange={(date) => handleDateChange(date, "startDate")}
            placeholder="Select Start Date"
            className="form-input"
          />

          <fieldset className="form-fieldset address">
            <legend>Address</legend>

            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="form-input"
            />

            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
            />

            <Dropdown
              label="State"
              id="state"
              options={[
                { label: "Select State", value: "" },
                ...usStates.map((state) => ({ label: state, value: state })),
              ]}
              value={formData.state}
              onChange={(e) => handleDropdownChange(e, "state")}
            />

            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="form-input"
            />
          </fieldset>

          <label htmlFor="department" className="form-label">
          </label>
          <Dropdown
            id="department"
            label="Department"
            options={[
              { label: "Sales", value: "Sales" },
              { label: "Marketing", value: "Marketing" },
              { label: "Engineering", value: "Engineering" },
              { label: "Human Resources", value: "Human Resources" },
              { label: "Legal", value: "Legal" },
            ]}
            value={formData.department}
            onChange={(e) => handleDropdownChange(e, "department")}
          />

          <button type="submit" className="form-button">
            Save
          </button>
        </form>

        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          corpsHtml={modalContent}
          text="Employee Created Successfully"
        />
      </div>
    </div>
  );
};

export default CreateEmployee;
