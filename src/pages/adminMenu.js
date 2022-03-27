import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';

const row = {
  display: 'flex', 
  flexDirection: 'row', 
  marginTop: '5vh', 
  alignItems: 'center', 
  justifyContent: 'center', 
  color: 'white',  
  borderRadius: '5px'
};

const column = {
  display: 'flex', 
  flexDirection: 'column', 
  marginTop: '3%',
  marginBottom: '5%', 
  alignItems: 'center', 
  marginLeft: '15%',
  marginRight: '15%',
};


const clickableButton = { 
  flex: 1,  
  backgroundColor: "white", 
  color: '#2422BD', 
  width: '100%', 
  height: '160vh', 
  borderColor: 'whitesmoke' 
}
const unclickableButton = { 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundColor: "#62C066", 
  color: 'white', 
  borderRadius: '4px', 
  width: '50vh', 
  borderColor: '#5BAA5E' 
}

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
  marginTop: '-65px',
  marginLeft: '-1450px',
	width: '1px',
	height: '1px'
};

const AdminMenu = () => {

  const navigate = useNavigate();
  
  function handleClick(e, page) {
    e.preventDefault();
    history.push(page);
  }

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  let isMobile = (width <= 768);
  return (
    <>
        <div style={column}>
          <div style={isMobile ? column : row}> 
              <div style={logo}>
                <img src={Logo} width= "140px" height="140px" alt="Logo" />
              </div>
          </div> 
          <div style={isMobile ? column : row}>
            <div style={{ display: 'block', width: 700, padding: 30, marginLeft: 1850, marginTop: -140 }}>
              <Dropdown>
                  <Dropdown.Toggle variant="success">
                    Open Menu
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={()=>navigate("/dataLoad")}>
                      Cargar datos
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      Calendarios
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      Horarios
                    </Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
    </>
          
  );
};

export default AdminMenu;