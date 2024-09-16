import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ selectedDate, onDateChange, placeholder }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      placeholderText={placeholder}
      dateFormat="MM/dd/yyyy"
      className="date-picker"
    />
  );
};

export default DatePickerComponent;
