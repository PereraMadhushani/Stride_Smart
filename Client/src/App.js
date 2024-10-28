import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Drivers from './Pages/Drivers';
import DriversDetails from './Pages/DriversDetails';
import AddNewDrivers from './Pages/DriversDetails/AddNewDrivers';
import EmployeeManagement from './Pages/EmployeeManagement';
import AddNewEmployee from './Pages/EmployeeManagement/AddNewEmployee';
import EmployeePerformance from './Pages/EmployeePerformance';
import SeeDetails from './Pages/EmployeePerformance/SeeDetails';
import Home from './Pages/Home';
import Leave_01 from './Pages/Leave_01';
import Login from './Pages/Login';
import SalaryMain from './Pages/SalaryMain';
import Salary from './Pages/SalaryMain/Salary';
import SeePerformance from './Pages/SeePerformance';
import HistoryRequestMaterial from './Pages/HistoryRequestMaterial';
import NewRequest from './Pages/NewRequest';
import Notification from './Pages/Notifications';
import SalaryCalc from './Pages/SalaryCalc';
import SalarySlip from './Pages/SalarySlip';
import EditEmployee from './Pages/EditEmployee.js'
import EditDriver from './Pages/EditDriver'
import AddNewUser from './Pages/AdminDashboard/AddNewUser'
import AdminDashboard from './Pages/AdminDashboard'
import StoreManagerDashboard from './Pages/StoreManager/StoreManagerDashboard';



import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee_performance" element={<EmployeePerformance />} />
        <Route path="/employeeManagement" element={<EmployeeManagement />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driversDetails" element={<DriversDetails />} />
        <Route path="/seeDetails" element={<SeeDetails />} />
        <Route path="/addNewEmployee" element={<AddNewEmployee />} />
        <Route path="/addNewDrivers" element={<AddNewDrivers />} />
        <Route path="/seePerformance" element={<SeePerformance />} />
        <Route path="/salaryMain" element={<SalaryMain />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/leave01" element={<Leave_01 />} />
        <Route path="/HistoryRequestMaterial" element={<HistoryRequestMaterial />} />
        <Route path="/newRequest" element={<NewRequest />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/salaryCalc" element={<SalaryCalc />} />
        <Route path="/salarySlip" element={<SalarySlip />} />
        <Route path="/dashboard/edit_employee/:e_id" element={<EditEmployee />} />
      <Route path="/admin_dashboard" element={<AdminDashboard/>}/>
      <Route path="/addNewUser" element={<AddNewUser/>}/>
      <Route path="/storemanager_dashboard" element={<StoreManagerDashboard />}></Route>
      <Route path="/edit_driver" element={<EditDriver />}></Route>
      <Route path="/storemanager_dashboard" element={<StoreManagerDashboard />}></Route>
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
