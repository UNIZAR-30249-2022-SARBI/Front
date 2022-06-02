import React from 'react';
import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactSession } from 'react-client-session';
import { LayersControl, MapContainer, TileLayer, useMap,WMSTileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
//import CustomWMSLayer from './CustomWMSLayer';


import NavBar from '../components/NavBar/navbar';
import EINAMap from '../components/map';

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
    marginLeft: '10%',
    marginRight: '10%',
};


const logo = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-1450px',
    marginTop: '3vh',
    width: '1px',
    height: '1px'
};

const mapid = {
  marginTop:'20vh',
  marginLeft: '30vh',
  marginRight: '60vh',
  width: '10px',
  height: '2px'
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
      <NavBar />
     <EINAMap/>
    </>

  );
};

export default AdminMenu;

//                       <WMSTileLayer className="a" url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta0" transparent={true} opacity= "0.5" />
//                       <CustomWMSLayer layers ={['proyecto:planta0']} options={{ "format": "image/png", "transparent":"true", "opacity": "0.5", "info_format":"text/html" }} url="http://localhost:8080/geoserver/proyecto/wms"/>
