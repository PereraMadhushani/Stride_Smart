import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import person from '../../assets/images/person.png';
import './index.css';
import Navbar from '../../Components/Navbar';



const EmployeePerformance = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <><Navbar/>
    <div className="employee-performance">
      <h1>Employee Performance</h1>
      
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>User Id</th>
            <th>Name</th>
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
                <td>{e.user_id}</td>
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>
                  <Link
                    to={`/dashboard/see_details/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    See Details
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div></>
  );
}

export default EmployeePerformance;
