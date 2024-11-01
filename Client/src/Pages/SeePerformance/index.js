import { Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from '../../Components/Navbar';
import './index.css';
import SearchBar from '../../Components/SearchBar';

const SeePerformance = () => {
  
  const [performance, setPerformance] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());

  const [employeeTotal, setEmployeeTotal] = useState();
  const [driverTotal, setDriverTotal] = useState();
 
  const [orderTotal, setOrderTotal] = useState([]);

  const [filteredPerformance, setFilteredPerformance] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    employeeCount();
    managerCount();
    driverCount();
    orderCount();

    // Set the mock data as the initial performance data
    setPerformance(mockData);
    setFilteredPerformance(mockData);
  }, []);

  const employeeCount = () => {
    axios.get('http://localhost:5000/count/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };

  const managerCount = () => {
    axios.get('http://localhost:5000/count/manager_count')
      .then(result => {
        if (result.data.Status) {
          setManagerTotal(result.data.Result[0].manager);
        }
      });
  };

  const driverCount = () => {
    axios.get('http://localhost:5000/count/driver_count')
      .then(result => {
        if (result.data.Status) {
          setDriverTotal(result.data.Result[0].driver);
        }
      });
  };

  const orderCount = () => {
    axios.get('http://localhost:5000/count/order_count')
      .then(result => {
        if (result.data.Status) {
          setOrderTotal(result.data.Result[0].order);
        }
      });
  };


  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Mock data for demonstration purposes
  const mockData = {
   
    monthlyData: [
      { month: 'Jan', Employees: 120, Orders: 100 },
      { month: 'Feb', Employees: 130, Orders: 110 },
      { month: 'Mar', Employees: 140, Orders: 105 },
      { month: 'Apr', Employees: 150, Orders: 115 },
      { month: 'May', Employees: 160, Orders: 120 },
      { month: 'Jun', Employees: 170, Orders: 125 },
      { month: 'Jul', Employees: 180, Orders: 130 },
      { month: 'Aug', Employees: 190, Orders: 135 },
      { month: 'Sep', Employees: 200, Orders: 140 },
      { month: 'Oct', Employees: 210, Orders: 145 },
      { month: 'Nov', Employees: 220, Orders: 150 },
      { month: 'Dec', Employees: 230, Orders: 155 },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="see-performance-container">
        <main>

          <h1 className="see-performance-title"><b>See Performance</b></h1>
          <div className="see-performance-filters">
            <SearchBar />
            <Select value={year} onChange={handleYearChange} className="see-performance-year-select">

       
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </MenuItem>
              ))}
            </Select>
          </div>
  
          <div className="see-performance-metrics">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="see-performance-metric-card">
                  <CardContent>
                    <Typography variant="h6"><b>Total Employees:</b></Typography>
                    <Typography variant="h5">{filteredPerformance.totalEmployees}</Typography>
                  </CardContent>
                </Card>
              </Grid>


              <Grid item xs={12} sm={6} md={3}>
                <Card className="see-performance-metric-card">
                  <CardContent>
                    <Typography variant="h6"><b>Total Drivers:</b></Typography>
                    <Typography variant="h5">{filteredPerformance.totalDrivers}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="see-performance-metric-card">
                  <CardContent>
                    <Typography variant="h6"><b>Total Complete Orders:</b></Typography>
                    <Typography variant="h5">{filteredPerformance.totalCompleteOrders}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card className="see-performance-metric-card">
                  <CardContent>
                    <Typography variant="h6"><b>Salary (Rs):</b></Typography>
                    <Typography variant="h5">{filteredPerformance.salary}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
  
          <div className="see-performance-chart-container">
            <h2 className="see-performance-subtitle"><b>Overview at the End of Year</b></h2>
            <LineChart width={500} height={250} className="see-performance-chart" data={filteredPerformance.monthlyData || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Employees" stroke="#8884d8" />
              <Line type="monotone" dataKey="Orders" stroke="#82ca9d" />
            </LineChart>
          </div>
        </main>
      </div>
    </>
  );
};

export default SeePerformance;
