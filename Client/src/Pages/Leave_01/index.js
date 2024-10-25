import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import './index.css'; // Linking your CSS file
import Navbar from '../../Components/Navbar';
import SearchBar from '../../Components/SearchBar'; // Assuming you have a custom SearchBar component

// Initial sample data for leave requests
const initialData = [
  { id: 1, appliedBy: 'John Doe', appliedOn: '2023-07-01', onLeave: '2023-07-05', duration: '5 days', status: 'Approval' },
  { id: 2, appliedBy: 'Jane Smith', appliedOn: '2023-07-02', onLeave: '2023-07-10', duration: '3 days', status: 'Pending' },
  { id: 3, appliedBy: 'Alice Johnson', appliedOn: '2023-07-03', onLeave: '2023-07-15', duration: '7 days', status: 'Rejected' },
  { id: 4, appliedBy: 'Bob Brown', appliedOn: '2023-07-04', onLeave: '2023-07-20', duration: '2 days', status: 'Approval' },
  { id: 5, appliedBy: 'Eve Davis', appliedOn: '2023-07-05', onLeave: '2023-07-25', duration: '4 days', status: 'Approval' },
];

function App() {
  const [data, setData] = useState(initialData);

  // Approve button handler
  const handleApprove = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Approval' } : item));
  };

  // Reject button handler
  const handleReject = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Rejected' } : item));
  };

  return (
    <>
      <Navbar />  {/* Custom Navbar Component */}
      <Container>
        <h1>Leave Management System</h1>
        <SearchBar />  {/* Custom SearchBar Component */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
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
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.appliedBy}</TableCell>
                <TableCell>{item.appliedOn}</TableCell>
                <TableCell>{item.onLeave}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => handleApprove(item.id)}>✔️</Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(item.id)}>❌</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}

export default App;
