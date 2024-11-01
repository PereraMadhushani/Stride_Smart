import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    if (otp.length === 6) {
      // Assuming OTP is correct, navigate to the login page
      navigate('/login');
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="otp-verification-container">
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div className="otp-verification-form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6"
          />
        </div>
        <Link to="/setNewPassword" className="otp-verification-btn">Continue</Link>
        <Link to="/login" className="otp-verification-btn">Back to Login</Link>
      </form>
    </div>
  );
};

export default OtpVerification;