import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <div className="clear-square"> {/* Clear square container */}
        <main className="main">
          <div className="welcome-section">
            <div className="text-section">
              <h1 className='wc'>Malitha Lanka Shoe Production</h1>
              <h3 className='wc-content'>"Our mission is to deliver exceptional quality and customer satisfaction through innovative solutions and support"</h3>
              
              <div className="buttons"><br></br>
                <Link to="/login" className="btn3 login-home">LOGIN</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
