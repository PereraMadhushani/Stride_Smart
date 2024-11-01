
import React, {useState,useEffect} from 'react';

import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import BackButton from '../BackButton';
import './index.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]); // Store notifications
  const [showNotifications, setShowNotifications] = useState(false); // Toggle notifications dropdown
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  // Fetch notifications for the user
  useEffect(() => {
    const userId = 99; // Replace with actual user ID from context or props
    axios.get(`http://localhost:5000/admin/notifications/${userId}`)
      .then(response => {
        if (response.data.success) {
          setNotifications(response.data.notifications);
        } else {
          console.error("Failed to fetch notifications:", response.data.error);
        }
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('/');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => {
        console.error("Logout Error: ", error);
        alert("Logout failed. Please try again.");
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="navbar-unique">
      <div className="logo-container-unique">
        <img src={logo} className="logo-unique" alt="logo" />
      </div>
      {/* Menu on the right */}
      <nav className="menu-container">
        <ul className="menu-items">
          <li>
            <select className="language-select">
              <option value="english">English</option>
              <option value="sinhala">Sinhala</option>
            </select>
          </li>
          <li className="notification-icon">
          <button onClick={toggleNotifications}>
              <NotificationsNoneIcon className="icon" />
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </button>

             {/* Notifications Dropdown */}
             {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.length === 0 ? (
                  <p>No new notifications</p>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <p>{notification.message}</p>
                      <span>{new Date(notification.created_at).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            )}

          </li>
          <li>
            <BackButton />
          </li>
          <li className="dropdown-unique">
            <div onClick={toggleDropdown} className="profile-link-unique">
              <FaUserAlt className="profile-icon-unique" />
            </div>
            {dropdownOpen && (
              <div className="dropdown-content-unique">
                <select
                  className="language-select-unique"
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                >
                  <option value="en">English</option>
                  <option value="si">සිංහල</option>
                </select>
                
                <Link to="/settings">{t('settings')}</Link>
                <Link to="/" onClick={handleLogout}>{t('logout')}</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;