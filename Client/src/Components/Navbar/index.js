import React, { useState } from 'react';
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
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

      <nav className="menu-container-unique">
        <ul className="menu-items-unique">
          <li>
            <Link to="#">
              <IoNotificationsCircle className="icon-unique" />
            </Link>
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