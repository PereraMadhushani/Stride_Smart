import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import checkIcon from '../../assets/images/check-icon.png';
import crossIcon from '../../assets/images/cross-icon.png';
import person from '../../assets/images/person.png';
import './index.css';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import BackButton from '../../Components/BackButton';

const EmployeeManagementSystem = () => {
  // Initialize state with mock data
  const [employee, setEmployee] = useState([
    { user_id: 1, image: 'person.png', name: 'John Doe', role: 'Software Engineer', address: '123 Main St', contact_number: '123-456-7890', email: 'john.doe@example.com', id: 1 },
    { user_id: 2, image: 'person.png', name: 'Jane Smith', role: 'Project Manager', address: '456 Elm St', contact_number: '987-654-3210', email: 'jane.smith@example.com', id: 2 },
    { user_id: 3, image: 'person.png', name: 'Sam Johnson', role: 'HR Specialist', address: '789 Oak St', contact_number: '555-555-5555', email: 'sam.johnson@example.com', id: 3 },
    { user_id: 4, image: 'person.png', name: 'Alice Brown', role: 'Marketing Coordinator', address: '321 Pine St', contact_number: '444-444-4444', email: 'alice.brown@example.com', id: 4 },
    { user_id: 5, image: 'person.png', name: 'Bob White', role: 'Sales Manager', address: '654 Maple St', contact_number: '333-333-3333', email: 'bob.white@example.com', id: 5 },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use Axios to fetch employee data from backend API
    axios.get('http://localhost:5000/employee/employees')
        .then(response => {
            setEmployee(response.data);  // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
        });
}, []);

  // Function to handle employee deletion
  const handleDelete = (e_id) => {
    console.log(`Attempting to delete employee with ID: ${e_id}`); // Log ID to be deleted
    axios.delete(`http://localhost:5000/employee/delete_employee/${e_id}`)
      .then((result) => {
        console.log("Delete result:", result.data); // Log the delete result
        if (result.data.Status) {
          // If the deletion is successful
          setEmployee(employee.filter(e => e.e_id !== e_id)); // Update state to reflect deletion
          alert("Employee deleted successfully");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="employee-management-system">
        <h1>Employee Management System</h1>
        <div className="top-controls">
          <select className="select-year">
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search type of keywords" />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e, index) => (
                <tr key={index}>
                  <td>{e.user_id}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/Images/` + e.image}
                      alt=""
                      className="employee_image"
                    />
                  </td>
                  <td>{e.name}</td>
                  <td>{e.role}</td>
                  <td>{e.address}</td>
                  <td>{e.contact_number}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeManagementSystem;