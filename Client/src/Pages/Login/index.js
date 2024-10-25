import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import bgImage from '../../assets/images/background.jpg'; // Background image
import './index.css';

const Login = () => {
    const [values, setValues] = useState({
        user_id: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/auth/managerlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='body-background' style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='clear-square'> {/* Clear square container */}
                <div className='login-container'>
                    <div className='p-5 rounded w-50 d-flex' style={{ backgroundColor: '#cccccc00' }}>
                        <div className='w-50 pr-3'>
                            {/* Logo and Heading Section */}
                            <div className='mb-4 text-center'>
                                <img src={logo} alt="Stride Smart Logo" style={{ width: '70px' }} />
                                <h3 className='h3'><b>Stride Smart</b></h3>
                            </div>
                            <h2 className='mb-4 custom-heading'>LOG IN</h2>
                            {error && <div className="text-warning">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='user_id'><strong>User ID:</strong></label>
                                    <input
                                        type="id"
                                        name="user_id"
                                        autoComplete='off'
                                        placeholder='Enter User ID'
                                        onChange={(e) => setValues({ ...values, user_id: e.target.value })}
                                        className='form-control rounded-0'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password'><strong>Password:</strong></label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Enter Password'
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                        className='form-control rounded-0'
                                    />
                                </div>
                                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>

                                <div className='mb-1'>
                                    <input type="checkbox" name="tick" id="tick" className='me-2' />
                                    <label htmlFor='tick'>You agree with terms & conditions</label>
                                </div>
                                <Link to='/forgot-password' className='forgot-password-link'>Forgot Password?</Link>
                            </form>
                        </div>
                        <div className='w-50 pl-3' style={{ border: 'none' }}>
                            {/* Additional content can go here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
