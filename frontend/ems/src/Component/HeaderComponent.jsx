import React from 'react'
import { useNavigate } from 'react-router-dom';  

const HeaderComponent = () => {
  const navigate = useNavigate();  

  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <a 
            className='navbar-brand' 
            onClick={() => navigate('/employees')} 
            style={{ cursor: 'pointer' }}  
          >
            Employee Management System
          </a>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent