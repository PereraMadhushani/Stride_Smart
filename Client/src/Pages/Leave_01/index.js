import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../../Components/Navbar'; // Assuming you have a Navbar component
import './index.css'; // Assuming you have a CSS file for styling


const LeaveManagementSystem = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const socket = io('http://localhost:5000'); // Backend server URL

    // Fetch initial data from the backend
    axios
      .get('http://localhost:5000/leave/apply')
      .then((result) => {
        console.log('API Response:', result.data);
        if (result.data.Status) {
          setData(result.data.Result); // Set data into state
        } else {
          console.error('Error fetching data:', result.data.Error);
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log('API Error:', err));

    // Listen for WebSocket updates
    socket.on('leaveStatusUpdated', (update) => {
      console.log('WebSocket update received:', update); // Log the received update
      setData((prevData) =>
        prevData.map((item) =>
          item.leave_id === update.leave_id ? { ...item, status: update.status } : item
        )
      );
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection disconnected'); // Log when the connection is disconnected
    });

    return () => {
      socket.off('leaveStatusUpdated');
      socket.off('disconnect');
    };
  }, []);

  const handleApprove = (leave_id, regNumber) => {
    console.log('Attempting to approve:', leave_id, regNumber);
    axios
      .post('http://localhost:5000/leave/approve', {
        leave_id,
        managerId: 1, // Assuming managerId is 1
        regNumber,
      })
      .then((response) => {
        if (response.data.message === 'Leave Approved') {
          setData((prevData) =>
            prevData.map((item) =>
              item.leave_id === leave_id ? { ...item, status: 'Approved' } : item
            )
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const handleReject = (leave_id, regNumber) => {
    axios
      .post('http://localhost:5000/leave/reject', {
        leave_id,
        managerId: 1, // Assuming managerId is 1
        regNumber,
      })
      .then((response) => {
        if (response.data.message === 'Leave rejected') {
          setData((prevData) =>
            prevData.map((item) =>
              item.leave_id === leave_id ? { ...item, status: 'Rejected' } : item
            )
          );
        }
      })
      .catch((err) => console.log(err));
  };

  /*const formatRegNumber = (regNumber) => {
    const regNumberStr = String(regNumber);
    // For example, M-001 for managers, S-002 for store managers
    if (regNumberStr.startsWith('M-')) return `Manager ${regNumberStr}`;
    if (regNumberStr.startsWith('S-')) return `Store Manager ${regNumberStr}`;
    if (regNumberStr.startsWith('D-')) return `Driver ${regNumberStr}`;
    if (regNumberStr.startsWith('E-')) return `Employee ${regNumberStr}`;
    return `Admin ${regNumberStr}`;
  };*/
  

  return (
    <>
      <Navbar />
      <Container>
        <h1>Leave Management System</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applied By</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>On Leave</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.leave_id}>
                <TableCell>{(item.regNumber)}</TableCell>
                <TableCell>
                    {isNaN(new Date(item.date)) ? 'Invalid Date' : new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                    {isNaN(new Date(item.leave_date)) ? 'Invalid Date' : new Date(item.leave_date).toLocaleDateString()}
                </TableCell>

                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(item.leave_id, item.regNumber)}
                    disabled={item.status !== 'Pending'}
                  >
                    ✔️
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(item.leave_id, item.regNumber)}
                    disabled={item.status !== 'Pending'}
                  >
                    ❌
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default LeaveManagementSystem;
