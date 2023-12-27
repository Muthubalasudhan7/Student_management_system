import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'; // You may need to create a CSS file for styling

const CustomDatePicker = ({ id, selected, onChange, placeholderText, dateFormat, showMonthDropdown, showYearDropdown, dropdownMode }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="custom-datepicker-container">
        <input
          id={id}
          type="text"
          value={selected ? selected.toLocaleDateString() : ''}
          placeholder={placeholderText}
          onFocus={() => setShowDatePicker(true)}
          readOnly
        />
      {showDatePicker && (
        <div className="date-picker-wrapper">
          <DatePicker
            selected={selected}
            onChange={(date) => {
              onChange(date);
              setShowDatePicker(false);
            }}
            dateFormat={dateFormat}
            showMonthDropdown={showMonthDropdown}
            showYearDropdown={showYearDropdown}
            dropdownMode={dropdownMode}
          />
          <div className="custom-datepicker-actions">
            <button className="custom-datepicker-btn">Cancel</button>
            <button className="custom-datepicker-btn" onClick={() => setShowDatePicker(false)}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
