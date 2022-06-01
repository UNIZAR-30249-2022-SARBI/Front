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



const UserMenu = () => {

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
      <div style={column}>
        <div style={isMobile ? column : row}>
          <div style={logo}>
            <img src={Logo} width="140px" height="140px" alt="Logo" />
          </div>
        </div>
        <p data-testid='session-text'>Identificado como: {email}</p>
        <div style={isMobile ? column : row}>
          <div style={{ display: 'block', width: 100, padding: 10, marginLeft: 1400, marginTop: -140 }}>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={() => navigate("/dataLoad")}>
                  Consultar Calendario
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => navigate("/createCalendar")}>
                  Consultar Horario
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>          
      </div>
      <MapContainer center={[41.6836, -0.88605]} zoom={17.5} scrollWheelZoom={false} style={{ height: "450px", width: "80%" }}>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                  <LayersControl position= "topright">
                    <LayersControl.Overlay checked name= "Plantas 0">
                      <WMSTileLayer name="a" url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta0" transparent={true} opacity= "0.5" />

                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Plantas 1">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta1" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Plantas 2">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta2" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Plantas 3">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta3" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Planta 4 (solo Edif.ADA)">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta4" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Planta 5 (solo Edif.ADA)">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:planta5" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name=  "Planta Sótanos">
                     <WMSTileLayer url="http://localhost:8080/geoserver/proyecto/wms"   format= "image/png" layers= "proyecto:sotano1" transparent={true} opacity= "0.5"/>
                    </LayersControl.Overlay>

                  </LayersControl>

                  
      </MapContainer>


    </>

  );
};

export default UserMenu;