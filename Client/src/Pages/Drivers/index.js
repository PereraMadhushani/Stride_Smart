import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import person from '../../assets/images/person.png';
import './index.css';
import Navbar from '../../Components/Navbar';
import axios from "axios"

const Drivers = () => {
  const [driver, setDriver] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/driver")
      .then((result) => {
        if (result.data.Status) {
          setDriver(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/delete_driver/' + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload()       
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error deleting driver:", err));
  };
  return (
    <><Navbar/>
    <div className="drivers">
      <h1>Drivers</h1>
      <div className="driver-controls">
        <button className="current-drivers">Current Drivers</button>
        
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search type of keywords" />
      </div>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {driver.map((e, index) => (
              <tr key={index}>
                <td>{e.user_id}</td>
                <td>
                  <img
                    src={`http://localhost:5000/Images/` + e.image}
                    alt=""
                    className="driver_image"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>{e.contact_number}</td>
                <td>{e.email}</td> 
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
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
    </>
  );
}

export default Drivers;
