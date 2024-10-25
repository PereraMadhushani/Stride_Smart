import React from 'react';
import Navbar from '../Components/NavBar';
import userIcon from '../Assets/user-icon.png';
import mapImage from '../Assets/map-image.png';
import { useTranslation } from 'react-i18next';
import './index.css';

const LeaveAply = () => {
   
        return (
          <>
            <Navbar />
            <div className="leave-application-container">
              <table className="leave-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Applied By</th>
                    <th>Applied On</th>
                    <th>On Leave</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>2024-10-08</td>
                    <td>Yes</td>
                    <td>3 Days</td>
                    <td>Approved</td>
                    <td>
                      <button className="approve-btn">✔</button>
                      <button className="reject-btn">✖</button>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </>
        );
      };

export default LeaveAply;
