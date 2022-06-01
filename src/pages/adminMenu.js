import React from 'react';
import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactSession } from 'react-client-session';
import NavBar from '../components/NavBar/navbar';

const row = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: '5px'
};

const column = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    alignItems: 'center',
    marginLeft: '15%',
    marginRight: '15%',
};

const logo = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-1450px',
    marginTop: '2vh',
    width: '1px',
    height: '1px'
};

const AdminMenu = () => {

  const navigate = useNavigate();

  const email = ReactSession.get("email");

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
     <NavBar/>
    </>

  );
};

export default AdminMenu;