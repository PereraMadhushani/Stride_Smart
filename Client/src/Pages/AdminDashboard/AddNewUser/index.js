import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';


const AddUserForm= () => {
  const [user, setUser] = useState({
    id:'',
    regNumber: '',
    name: '',
    password: '',
    confirmPassword:'',
    role: 'employee', // Default value
    address: '',
    contact_number: '',
    email: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate that passwords match
    if (user.password !== user.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Create FormData object to send both image and form data
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('regNumber', user.regNumber);
    formData.append('name', user.name);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('address', user.address);
    formData.append('contact_number', user.contact_number);
    formData.append('email', user.email);
    if (user.image) {
      formData.append('image', user.image);
    }

    try {
      // Send the form data to the backend using Axios
      const response = await axios.post('http://localhost:5000/admin/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check response and navigate if successful
      if (response.data.status === true) {
        navigate('/admin_dashboard'); // Assuming you have a success route
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Regiter New User</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
            <label for="inputId" className="form-label">
              ID:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputId"
              placeholder="Enter Id"
              value={user.id}
              onChange={(e) =>
                setUser({ ...user, id: e.target.value })
              }
            />
          </div>
        <div className="col-12">
            <label for="inputRegNumber" className="form-label">
              Reg Number:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputRegNumber"
              placeholder="Enter Reg NUMber"
              value={user.regNumber}
              onChange={(e) =>
                setUser({ ...user, regNumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Role:
            </label>
            <select
              className="form-control"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="storemanager">Store Manager</option>
              <option value="employee">Employee</option>
              <option value="driver">Driver</option>
            </select>
          </div>
        
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              value={user.address}
              autoComplete="off"
              onChange={(e) =>
                setUser({ ...user, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputContactNumber" className="form-label">
              Contact Number:
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputContactNumber"
              placeholder="076123456"
              value={user.contact_number}
              autoComplete="off"
              onChange={(e) =>
                setUser({ ...user, contact_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="abcde@gmail.com"
              value={user.email}
              autoComplete="off"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name = "image"
              onChange={(e) => setUser({...user, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default AddUserForm;