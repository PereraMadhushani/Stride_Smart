import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'; // Import the NavBar component
import './index.css';
import { useTranslation } from 'react-i18next';

const NewRequest = () => {
  const [date, setDate] = useState('');
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [rawMaterial, setRawMaterial] = useState('');
  const [requiredDate, setRequiredDate] = useState('');

  const handleSubmit = () => {
    // Add submit functionality here
    alert("Form Submitted");
  };

  const handleEdit = () => {
    // Add edit functionality here
    alert("Form Edited");
  };

  return (
    <div className="request-form-container">
      {/* Include NavBar component */}
      <Navbar />

      <section className="request-form">
        <h2 className="form-title">New Request</h2>

        <form>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Emp. Id:</label>
            <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Emp. Name:</label>
            <input type="text" value={empName} onChange={(e) => setEmpName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Emp. Address:</label>
            <input type="text" value={empAddress} onChange={(e) => setEmpAddress(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Raw Material and Quantity Required:</label>
            <textarea value={rawMaterial} onChange={(e) => setRawMaterial(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <label>Required Date:</label>
            <input type="date" value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button type="button" className="edit-btn" onClick={handleEdit}>Edit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewRequest;
