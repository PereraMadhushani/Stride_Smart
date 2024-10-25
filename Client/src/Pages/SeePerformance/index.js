import { Card, CardContent, Grid, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Navbar from '../../Components/Navbar';
import './index.css';
import SearchBar from '../../Components/SearchBar';const SeePerformance = () => {
  const [performance, setPerformance] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  /*const [searchTerm, setSearchTerm] = useState('');*/
  const [filteredPerformance, setFilteredPerformance] = useState({});

  useEffect(() => {
    fetchPerformanceData(year);
  }, [year]);

  const fetchPerformanceData = async (selectedYear) => {
    try {
      const response = await axios.get(`/api/performance?year=${selectedYear}`);
      setPerformance(response.data);
      setFilteredPerformance(response.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const filterData = (data, term) => {
    if (!term) return data;
    const lowercaseTerm = term.toLowerCase();
    const filteredMonthlyData = data.monthlyData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowercaseTerm)
      )
    );
    return {
      ...data,
      monthlyData: filteredMonthlyData,
      totalEmployees: filteredMonthlyData.length > 0 ? filteredMonthlyData[filteredMonthlyData.length - 1].Employees : 0,
      totalCompleteOrders: filteredMonthlyData.length > 0 ? filteredMonthlyData[filteredMonthlyData.length - 1].Orders : 0,
    };
  };

  // Mock data for demonstration purposes
  const mockData = {
    totalEmployees: 150,
    newEmployees: 20,
    totalDrivers: 50,
    totalCompleteOrders: 1200,
    totalDamagedProduct: 15,
    salary: 500000,
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

  // Set the mock data as the initial performance data
  useEffect(() => {
    setPerformance(mockData);
    setFilteredPerformance(mockData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <main>
          <h1 style={{marginLeft:'500px'}}><b>See Performance</b></h1>
          <div className="filters">
            <SearchBar/>
            <Select value={year} onChange={handleYearChange} className="year-select">
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Grid container spacing={3} className="performance-metrics">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>Total Employees:</b></Typography>
                  <Typography variant="h4">{filteredPerformance.totalEmployees}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>New Employees:</b></Typography>
                  <Typography variant="h4">{filteredPerformance.newEmployees}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>Total Drivers:</b></Typography>
                  <Typography variant="h4">{filteredPerformance.totalDrivers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>Total Complete Orders:</b></Typography>
                  <Typography variant="h4">{filteredPerformance.totalCompleteOrders}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>Total Damaged Product:</b></Typography>
                  <Typography variant="h4">{filteredPerformance.totalDamagedProduct}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="metric-card" style={{ backgroundColor: '#287094', width: '340px', height: '140px' }}>
                <CardContent>
                  <Typography variant="h6"><b>Salary (Rs):</b></Typography>
                  <Typography variant="h4">{filteredPerformance.salary}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div className="chart">
            <h2 className='text'><b>Overview at the End of Year</b></h2>
            <LineChart width={600} height={300} className='chart1' data={filteredPerformance.monthlyData || []}
             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Employees" stroke="#8884d8"  />
              <Line type="monotone" dataKey="Orders" stroke="#82ca9d" />
            </LineChart>
          </div>
        </main>
      </div>
    </>
  );
};

export default SeePerformance;