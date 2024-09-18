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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.street) newErrors.street = "Street is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    return newErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Saving data:", formData);
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
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
            className={`form-input ${errors.firstName ? 'error' : ''}`}
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}

          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'error' : ''}`}
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}

          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <DatePickerComponent
            id="dateOfBirth"
            selectedDate={formData.dateOfBirth}
            onDateChange={(date) => handleDateChange(date, "dateOfBirth")}
            placeholder="Select Date of Birth"
            className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
          />
          {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}

          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <DatePickerComponent
            id="startDate"
            selectedDate={formData.startDate}
            onDateChange={(date) => handleDateChange(date, "startDate")}
            placeholder="Select Start Date"
            className={`form-input ${errors.startDate ? 'error' : ''}`}
          />
          {errors.startDate && <div className="error-message">{errors.startDate}</div>}

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
              className={`form-input ${errors.street ? 'error' : ''}`}
            />
            {errors.street && <div className="error-message">{errors.street}</div>}

            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-input ${errors.city ? 'error' : ''}`}
            />
            {errors.city && <div className="error-message">{errors.city}</div>}

            <Dropdown
              label="State"
              id="state"
              options={[
                { label: "Select State", value: "" },
                ...usStates.map((state) => ({ label: state, value: state })),
              ]}
              value={formData.state}
              onChange={(e) => handleDropdownChange(e, "state")}
              className={`form-input ${errors.state ? 'error' : ''}`}
            />
            {errors.state && <div className="error-message">{errors.state}</div>}

            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`form-input ${errors.zipCode ? 'error' : ''}`}
            />
            {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
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
            className={`form-input ${errors.department ? 'error' : ''}`}
          />
          {errors.department && <div className="error-message">{errors.department}</div>}

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
