import React from 'react';
import Navbar from '../../Components/Navbar'; // Import the NavBar component
import './index.css';
import { useTranslation } from 'react-i18next';

const HistoryRequestMaterial = () => {
  const requestData = [
    
  ];

  const handleDetailsClick = (id) => {
    alert(`See details for ${id}`);
    // Add functionality to navigate to details page or view modal
  };

  return (
    <div className="history-container">
      {/* Include NavBar component */}
      <Navbar />

      <section className="history-content">
        <h2 className="history-title">History of Request Material</h2>

        <input type="text" placeholder="Search type of keywords" className="search-bar" />

        <table className="history-table">
          <thead>
            <tr>
              <th>EMP. ID</th>
              <th>EMP. NAME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="emp-info">
                    <span className="emp-icon">👤</span>
                    {employee.id}
                  </div>
                </td>
                <td>{employee.name}</td>
                <td>
                  <button className="details-btn" onClick={() => handleDetailsClick(employee.id)}>See Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default HistoryRequestMaterial;
