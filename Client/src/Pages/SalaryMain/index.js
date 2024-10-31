import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from '@mui/material';
import Navbar from '../../Components/Navbar';
import SearchBar from '../../Components/SearchBar';

// Background image import (adjust the path as necessary)
/*import bgImage from '../../assets/images/loging-bg.jpg'; */

const SalaryMain = () => {
  const [salaryData, setSalaryData] = useState([
    { id: '001', name: 'John Doe', month: 'January', netSalary: 5000 },
    { id: '002', name: 'Jane Smith', month: 'February', netSalary: 5500 },
  ]);
  const navigate = useNavigate();

  const handleDownloadPdf = (id) => {
    console.log(`Downloading PDF for employee ID: ${id}`);
  };

  const handleSendToEmployee = (id) => {
    console.log(`Sending to employee ID: ${id}`);
  };

  const handleNameClick = (id) => {
    navigate(`/salaryCalc`);
  };

  return (
    <div style={{
      /*backgroundImage: `url(${bgImage})`, // Set background image*/
      backgroundSize: 'cover',            // Cover the entire area
      backgroundPosition: 'center',       // Center the image
      backgroundRepeat: 'no-repeat',      // Prevent repeating the image
      minHeight: '100vh',                 // Full screen height
      position: 'absolute',                // Absolute positioning
      width: '100%',                      // Full width
      padding: '20px',
      marginTop: '64px',
    }}>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Salary Slip
        </Typography>
        <SearchBar />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>EMP. ID</TableCell>
                <TableCell>EMP. NAME</TableCell>
                <TableCell>SALARY MONTH</TableCell>
                <TableCell>NET SALARY</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleNameClick(employee.id)}
                    >
                      {employee.name}
                    </Button>
                  </TableCell>
                  <TableCell>{employee.month}</TableCell>
                  <TableCell>{employee.netSalary}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => handleSendToEmployee(employee.id)}
                      >
                        Send
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button variant="contained" sx={{ backgroundColor: '#D9D9D9', color: 'black' }}>
            Previous
          </Button>
          <Pagination count={10} variant="outlined" shape="rounded" />
          <Button variant="contained" sx={{ backgroundColor: '#D9D9D9', color: 'black' }}>
            Next
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SalaryMain;
