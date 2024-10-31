import React, { useState } from 'react';
import './index.css';
import Navbar from '../../Components/Navbar';
import { useTranslation } from 'react-i18next';

// Import components
import SeePerformance from '../SeePerformance';
import EmployeeManagementSystem from '../EmployeeManagement';
import AboutDrivers from '../Drivers';
import EmployeePerformance from '../EmployeePerformance';
import LeaveManagement from '../Leave_01'; 
import CalculateSalary from '../SalaryMain'; 
import RequestMaterial from '../HistoryRequestMaterial'; 
import Order from '../Order';

const Dashboard = () => {
  const { t } = useTranslation();

  const items = [
    { id: 6, title: t('seePerformance'), component: <SeePerformance /> },
    { id: 3, title: t('employeeManagementSystem'), component: <EmployeeManagementSystem /> }, 
    { id: 7, title: t('aboutDrivers'), component: <AboutDrivers /> },
    { id: 1, title: t('order'), component: <Order /> },
    { id: 2, title: t('leaveManagement'), component: <LeaveManagement /> }, 
    { id: 4, title: t('calculateSalary'), component: <CalculateSalary /> },
    { id: 5, title: t('requestMaterial'), component: <RequestMaterial /> },
  ];

  // Set the initial state to the item corresponding to SeePerformance
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar items={items} selectedItem={selectedItem} setSelectedItem={handleItemClick} />
        <div className="dashboard-content">
          {selectedItem ? (
            selectedItem.component
          ) : (
            <DefaultContent />
          )}
        </div>
      </div>
    </>
  );
};

const Sidebar = ({ items, selectedItem, setSelectedItem }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {items.map((item) => (
          <li key={item.id} className={`sidebar-item ${selectedItem.id === item.id ? 'active' : ''}`}>
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
  const { t } = useTranslation();
  return <h2>{t('welcomeMessage')}</h2>;
};

export default Dashboard;