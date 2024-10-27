import React from 'react'
import './index.css'
import img2 from '../../../assets/images/img2.png';
import img1 from '../../../assets/images/img1.jpeg';
import {useNavigate } from 'react-router-dom'

const Home = () => {

    const Navigate = useNavigate();
  return (
    <div className='main-container'>
        <div className='main-container-text'>
            <div className='main_container-input'>
                <input type='text' placeholder='Search type of keywords'/>
            </div>

            <div className='main'>

            <a href=''  onClick={()=>Navigate('/newrequest')}>
            <div className='main-btn'>
              <div>
              <img src={img2} />
              <h2>New Request</h2>
              </div>
            
            </div>

            </a>

            <a href=''  onClick={()=>Navigate('/rerequest')}>
            <div className='main-btn'>
              <div>
              <img src={img2} />
              <h2>Re-Request</h2>
              </div>
            
            </div>

            </a>

            </div>




           <div className='last-txet'>

           
            <div className='middle-main'>
              
              <h2>Overview</h2>
              <img src={img1} width={300} height={220} />
              
              
            </div>
           
           <div className='last-one'>
            <div className='last'>
              <p>Buttons</p>
              <img src={img2} width={20} height={20}/>
            </div>
            <div className='last'>
              <p>Leather</p>
              <img src={img2} width={20} height={20}/>
            </div>
            <div className='last'>
              <p>Fabric</p>
              <img src={img2} width={20} height={20}/>
            </div>
            <div className='last'>
              <p>Paint</p>
              <img src={img2} width={20} height={20}/>
            </div>
            </div>


            </div>

           

          
            
         
          
        </div> 
    </div>
  )
}

export default Home
