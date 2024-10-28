import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import person from '../../assets/images/person.png';
import './index.css';
import Navbar from '../../Components/Navbar';
import axios from "axios"

const Drivers = () => {
  const [driver, setDriver] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use Axios to fetch driver data from backend API
    axios.get('http://localhost:5000/driver/drivers')
        .then(response => {
            setDriver(response.data);  // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
}, []);

const handleDelete = (d_id) => {
  console.log(`Attempting to delete driver with ID: ${d_id}`); // Log ID to be deleted
  axios.delete(`http://localhost:5000/driver/delete_driver/${d_id}`)
    .then((result) => {
      console.log("Delete result:", result.data); // Log the delete result
      if (result.data.Status) {
        // If the deletion is successful
        setDriver(driver.filter(d => d.d_id !== d_id)); // Update state to reflect deletion
        alert("Driver deleted successfully");
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => {
      console.error("Error deleting Driver:", err);
    });
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
            {driver.map((d, index) => (
              <tr key={index}>
                <td>{d.user_id}</td>
                <td>
                  <img
                    src={`http://localhost:5000/Images/` + d.image}
                    alt=""
                    className="driver_image"
                  />
                </td>
                <td>{d.name}</td>
                <td>{d.address}</td>
                <td>{d.contact_number}</td>
                <td>{d.email}</td> 
                <td>
                  <Link
                    to={`/dashboard/edit_driver/` + d.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(d.id)}
                    
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
