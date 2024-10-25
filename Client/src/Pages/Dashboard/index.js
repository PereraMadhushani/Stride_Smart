import React, { useState } from 'react';
import './index.css';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';

// Import components
import EmployeePerformance from '../EmployeePerformance';
import LeaveManagement from '../Leave_01'; 
import EmployeeManagementSystem from '../EmployeeManagement';
import CalculateSalary from '../SalaryMain'; 
import RequestMaterial from '../HistoryRequestMaterial'; 
import SeePerformance from '../SeePerformance';
import AboutDrivers from '../Drivers';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, title: 'Employee Performance', path: '/employee_performance' },
    { id: 2, title: 'Leave Management', path: '/leave01' }, 
    { id: 3, title: 'Employee Management System', path: '/employeeManagement' }, 
    { id: 4, title: 'Calculate Salary', path: '/salaryMain' },
    { id: 5, title: 'Request Material', path: '/historyRequestMaterial' },
    { id: 6, title: 'See Performance', path: '/seePerformance' },
    { id: 7, title: 'About Drivers', path: '/drivers' },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    navigate(item.path); 
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar items={items} setSelectedItem={handleItemClick} />
        <div className="dashboard-content">
          {selectedItem ? (
            <SelectedContent item={selectedItem} />
          ) : (
            <DefaultContent />
          )}
        </div>
      </div>
    </>
  );
};

const Sidebar = ({ items, setSelectedItem }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {items.map((item) => (
          <li key={item.id} className="sidebar-item">
            <button onClick={() => setSelectedItem(item)} className="sidebar-button">
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Default content to show when no item is selected
const DefaultContent = () => {
  return <h2>Welcome to the Dashboard. Please select an item from the sidebar.</h2>;
};

// Component to render selected content based on the item clicked
const SelectedContent = ({ item }) => {
  switch (item.id) {
    case 1:
      return <EmployeePerformance />;
    case 2:
      return <LeaveManagement />;
    case 3:
      return <EmployeeManagementSystem />;
    case 4:
      return <CalculateSalary />;
    case 5:
      return <RequestMaterial />;
    case 6:
      return <SeePerformance />;
    case 7:
      return <AboutDrivers />;
    default:
      return <DefaultContent />;
  }
};

export default Dashboard;
