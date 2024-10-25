import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import person from '../../../assets/images/person.png';
import './index.css';
import Navbar from '../../../Components/Navbar';
import UploadButton from '../../../Components/UploadButton';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import BackButton from '../../Components/BackButton';

const AddEmployeeForm = () => {
  const [employee, setEmployee] = useState({
   user_id: "",
   name:"",
   role:"",
   password:"",
   address:"",
   contact_number:"",
   email:"",
   image:""
  });

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData= new FormData();
    formData.append('user_id', employee.user_id);
    formData.append('name', employee.name);
    formData.append('role', employee.role);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('contact_number', employee.contact_number);
    formData.append('email', employee.email);
    formData.append('image', employee.image);


    axios.post('http://localhost:5000/auth/add_employee', formData)
    .then(result =>{
      if(result.data.Status){
          navigate('/employeeManagement');
      }else{
          alert(result.data.Error)
      }
  } )
    .catch(err => console.log(err))
    
  }


  

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add New Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
            <label for="inputName" className="form-label">
              User ID:
            </label>
            <input
              type="id"
              className="form-control rounded-0"
              id="inputId"
              placeholder="Enter User ID"
              onChange={(e) =>
                setEmployee({ ...employee, user_id: e.target.value })
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
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Role:
            </label>
            <select id="cars" name="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
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
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
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
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, contact_number: e.target.value })
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
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
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
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};



export default AddEmployeeForm;