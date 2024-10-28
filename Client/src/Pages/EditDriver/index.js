import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';  // Import the CSS file

const EditDriver = () => {
  const { d_id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState({
    name: '',
    image: '',
    address: '',
    contact_number: '',
    email: ''
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch the current employee details
    axios.get(`http://localhost:5000/employee/getEmployee/${d_id}`)
      .then((response) => {
        setDriverData(response.data);
        setPreviewImage(response.data.image);
      })
      .catch((error) => {
        console.error('Error fetching employee details', error);
      });
  }, [d_id]);

  const handleChange = (d) => {
    setDriverData({ ...driverData, [d.target.name]: d.target.value });
  };

  const handleImageChange = (d) => {
    const file = d.target.files[0];
    setDriverData({ ...driverData, image: file });
    
    // For previewing the image
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (d) => {
    d.preventDefault();

    const formData = new FormData(); // Create a FormData object to send files
    formData.append('name', driverData.name);
    formData.append('address',driverData.address);
    formData.append('contact_number', driverData.contact_number);
    formData.append('email', driverData.email);
    formData.append('image', driverData.image); // Append the image file


    // Send updated data to backend
    axios.put(`http://localhost:5000/driver/update_driver/${d_id}`, formData , {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure files are handled correctly
        }
      })
      .then((response) => {
        if (response.data.Status) {
          alert('Driver updated successfully');
          navigate('/drivers');
        } else {
          alert('Error updating driver');
        }
      })
      .catch((error) => {
        console.error('Error updating driver', error);
      });
  };

  return (
    <div className="edit-employee-container">
      <h2 className="edit-employee-title">Edit Driver</h2>
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <label>Name:</label>
        <input type="text" name="name" value={driverData.name} onChange={handleChange} className="form-input" />
        
        <div className="form-group">
          <label className="form-label" htmlFor="inputGroupFile01">Select Image:</label>
          <input
            type="file"
            className="form-input"
            id="inputGroupFile01"
            name="image"
            onChange={handleImageChange}
          />
          {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}
        </div>

        <label>Address:</label>
        <input type="text" name="address" value={driverData.address} onChange={handleChange} className="form-input" />

        <label>Contact Number:</label>
        <input type="text" name="contact_number" value={driverData.contact_number} onChange={handleChange} className="form-input" />

        <label>Email:</label>
        <input type="email" name="email" value={driverData.email} onChange={handleChange} className="form-input" />

        <button type="submit" className="submit-btn">Update Driver</button>
      </form>
    </div>
  );
};

export default EditDriver;
