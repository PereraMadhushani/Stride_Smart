import React from 'react';
import './index.css'; // Import the corresponding CSS file for styles
import Navbar from '../../Components/Navbar'; // Import the Navbar component
import { useTranslation } from 'react-i18next';

const SalarySlip = () => {
  const salaryData = [
    { id: 1, name: 'John Doe', month: 'September', salary: '$5000' },
    { id: 2, name: 'Jane Smith', month: 'September', salary: '$5500' },
    // Add more rows here
  ];

  return (
    <div className="salary-slip-container">
      {/* Include Navbar component */}
      <Navbar />

      <h2 className="title">Salary Slip</h2>

      <input type="text" placeholder="Search type of keywords" className="search-bar" />

      <table className="salary-table">
        <thead>
          <tr>
            <th>EMP. ID</th>
            <th>EMP. NAME</th>
            <th>SALARY MONTH</th>
            <th>NET SALARY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.month}</td>
              <td>{employee.salary}</td>
              <td>
                <button className="download-btn">⬇</button>
                <button className="email-btn">✉️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="prev-btn">Previous</button>
        <span className="page-number">1</span>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default SalarySlip;
