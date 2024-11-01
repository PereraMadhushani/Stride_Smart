import React from 'react';
import Navbar from '../../Components/Navbar';
import './index.css';

const LeaveAply = () => {
  return (
    <>
      <Navbar className="navbar" />
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
            {/* Add your table rows here */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LeaveAply;