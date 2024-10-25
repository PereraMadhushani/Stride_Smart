import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Card, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import person from '../../../assets/images/person.png';
import Navbar from '../../../Components/Navbar';
import './index.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmployeePerformance = () => {
  const data = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [
      {
        label: 'Order Quantity',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 60, 70, 90],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Quantity Per Year',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <><Navbar/>
    
    <Container>
      <Row className="mt-3">
        <Col md={4}>
          <Card className="profile-card"> {/* Apply custom class */}
            <Card.Body>
              <img src={person} alt="Person" className="img-fluid-1" />
              <Card.Text className="profile-id">Id: *****</Card.Text>
              <Card.Text className="profile-name">Name: *******</Card.Text>
              <Card.Text className="year">Year: 2024</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="text-right custom-dropdown-col">
          <DropdownButton id="dropdown-basic-button" title="2024">
            <Dropdown.Item href="#/action-1">2023</Dropdown.Item>
            <Dropdown.Item href="#/action-2">2022</Dropdown.Item>
            <Dropdown.Item href="#/action-2">2021</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card className="mt-3 chart-card ">
            <Card.Body>
              <Card.Title>Order Quantity Per Year</Card.Title>
              <Line data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mt-3 cards">
            <Card.Body>
              <Card.Title>Complete Orders</Card.Title>
              <Card.Text>34</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3 cards">
            <Card.Body>
              <Card.Title>Waiting Orders</Card.Title>
              <Card.Text>02</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3 cards">
            <Card.Body>
              <Card.Title>Salary (Rs.)</Card.Title>
              <Card.Text>25000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default EmployeePerformance;
