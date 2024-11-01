import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './index.css';

const HistoryRequestMaterial = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/newRequest');
  };

  const requestData = [
    
  ];

  const handleDetailsClick = (id) => {
    alert(`See details for ${id}`);
    // Add functionality to navigate to details page or view modal
  };

  return (
    <div className="history-request-material-container">
      <div className="header">
        <h1>History of Request Material</h1>
        <IconButton onClick={handleAddClick} className="add-button">
          <AddIcon />
        </IconButton>
      </div>

      <section className="history-content">
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