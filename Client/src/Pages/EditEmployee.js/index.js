import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';  // Import the CSS file

const EditEmployee = () => {
  const { e_id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    image: '',
    address: '',
    contact_number: '',
    email: ''
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch the current employee details
    axios.get(`http://localhost:5000/employee/getEmployee/${e_id}`)
      .then((response) => {
        setEmployeeData(response.data);
        setPreviewImage(response.data.image);
      })
      .catch((error) => {
        console.error('Error fetching employee details', error);
      });
  }, [e_id]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData({ ...employeeData, image: file });
    
    // For previewing the image
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object to send files
    formData.append('name', employeeData.name);
    formData.append('address', employeeData.address);
    formData.append('contact_number', employeeData.contact_number);
    formData.append('email', employeeData.email);
    formData.append('image', employeeData.image); // Append the image file


    // Send updated data to backend
    axios.put(`http://localhost:5000/employee/update_employee/${e_id}`, formData , {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure files are handled correctly
        }
      })
      .then((response) => {
        if (response.data.Status) {
          alert('Employee updated successfully');
          navigate('/employeeManagemen');
        } else {
          alert('Error updating employee');
        }
      })
      .catch((error) => {
        console.error('Error updating employee', error);
      });
  };

  return (
    <div className="edit-employee-container">
      <h2 className="edit-employee-title">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <label>Name:</label>
        <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="form-input" />
        
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
        <input type="text" name="address" value={employeeData.address} onChange={handleChange} className="form-input" />

        <label>Contact Number:</label>
        <input type="text" name="contact_number" value={employeeData.contact_number} onChange={handleChange} className="form-input" />

        <label>Email:</label>
        <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-input" />

        <button type="submit" className="submit-btn">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
