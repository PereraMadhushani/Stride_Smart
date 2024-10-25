import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import person from '../../assets/images/person.png';
import BackButton from '../BackButton'; // Import the BackButton
import './index.css'; // Custom styles

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <header className="navbar">
      {/* Logo on the left */}
      <div className="logo-container">
        <img src={logo} className="logo" alt="logo" />
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
          <li>
            <Link to="#">
              <NotificationsNoneIcon className="icon" />
            </Link>
          </li>
          <li>
            <BackButton /> {/* Integrate BackButton here */}
          </li>
          <li>
            <Link to="/profile" className="profile-link">
              <img src={person} className="profile-img" alt="Profile" />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout} className="logout-link">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
