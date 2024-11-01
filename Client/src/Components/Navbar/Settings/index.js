import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Custom styles for the settings page

const Settings = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleProfilePictureUpload = () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    axios.post('http://localhost:5000/api/uploadProfilePicture', formData)
      .then(response => {
        alert('Profile picture uploaded');
      })
      .catch(error => {
        console.error('There was an error uploading the profile picture!', error);
      });
  };

  const handleProfilePictureDelete = () => {
    setProfilePicture(null);
    alert('Profile picture deleted');
  };

  const handleSaveChanges = () => {
    const updatedProfile = {
      name,
      currentPassword,
      newPassword,
    };

    axios.post('http://localhost:5000/api/updateProfile', updatedProfile)
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-option">
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input type="file" id="profile-picture" accept="image/*" onChange={handleProfilePictureChange} />
        {profilePicture && (
          <div className="profile-picture-preview">
            <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="profile-picture" />
            <button onClick={handleProfilePictureUpload}>Upload</button>
            <button onClick={handleProfilePictureDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="settings-option">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div className="settings-option">
        <label htmlFor="current-password">Current Password:</label>
        <div className="password-container">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="current-password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </span>
        </div>
      </div>
      <div className="settings-option">
        <label htmlFor="new-password">New Password:</label>
        <div className="password-container">
          <input
            type={showNewPassword ? "text" : "password"}
            id="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </span>
        </div>
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default Settings;