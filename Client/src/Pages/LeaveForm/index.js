import React from 'react';

import Navbar from '../../Components/Navbar'; // Assuming you have a Navbar component
import './index.css';
import { useTranslation } from 'react-i18next';

const LeaveForm = () => {
  return (
    <>
      <Navbar />
      <div className="leave-application-container">
        <div className="leave-card">
          <h2>Leave Application</h2>
          <div className="leave-field">
            <label>Employee Name:</label>
          </div>
          <div className="leave-field">
            <label>Leave Type:</label>
          </div>
          <div className="leave-field">
            <label>Day Type:</label>
          </div>
          <div className="leave-field">
            <label>Leave Date:</label>
          </div>
          <div className="leave-field">
            <label>Reason:</label>
          </div>
          <div className="leave-field">
            <label>Status:</label>
          </div>
          <p className="action-msg">Please take an appropriate action.</p>
          <div className="button-group">
            <button className="approve-btn">Approve</button>
            <button className="reject-btn">Reject</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveForm;
