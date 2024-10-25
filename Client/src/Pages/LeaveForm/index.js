import React from 'react';

import Navbar from '../Components/NavBar'; // Assuming you have a Navbar component
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
            <span>John Doe</span> {/* You can replace this with dynamic data */}
          </div>
          <div className="leave-field">
            <label>Leave Type:</label>
            <span>Sick Leave</span> {/* Replace with dynamic data */}
          </div>
          <div className="leave-field">
            <label>Day Type:</label>
            <span>Full Day</span> {/* Replace with dynamic data */}
          </div>
          <div className="leave-field">
            <label>Leave Date:</label>
            <span>2024-10-08</span> {/* Replace with dynamic data */}
          </div>
          <div className="leave-field">
            <label>Reason:</label>
            <span>Medical</span> {/* Replace with dynamic data */}
          </div>
          <div className="leave-field">
            <label>Status:</label>
            <span>Pending</span> {/* Replace with dynamic data */}
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
