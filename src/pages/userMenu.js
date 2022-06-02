import React from 'react';
import { useEffect, useState } from 'react';
import Logo from '../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactSession } from 'react-client-session';
import { LayersControl, MapContainer, TileLayer, useMap,WMSTileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
//import CustomWMSLayer from './CustomWMSLayer';
import NavBar from '../components/NavBar/navbar';
import EINAMap from '../components/map';
import { Typography, FormControl, TextField } from '@mui/material';

import { sendRequest } from '../api/request';
import UserNavBar from '../components/NavBar/userNavbar';


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

const gen = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#685cf4",
    color: 'whitesmoke',
    borderRadius: '1vh',
    padding: '0.3vh 0.6vh',
    fontSize: '30px'
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '0.4vh solid graylight',
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [request, setRequest] = React.useState("");

    async function send() {
        console.log("SEND")
        await sendRequest(request, email, "")
            .then(response => {
                if (response) 
                    alert("Petición enviado correctamente");
                else
                    alert("Se ha producido un error, inténtelo de nuevo.");
                handleClose();
            }).catch(err => {
                alert("Se ha producido un error, inténtelo de nuevo.");
                handleClose();
            });
    }

  return (
    <>
        <UserNavBar />
        <EINAMap />
          <div className="row m-4">
              <div style={{marginLeft:'68vw'}}>
                  <button onClick={handleOpen} style={gen}>Enviar petición</button>
              </div>

          </div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <FormControl variant="standard" sx={{ m: 10, minWidth: '20vw' }}>
                      <Typography variant="h5" gutterBottom>
                          Petición
                      </Typography>
                      <TextField
                          id="standard-number"
                          type="text"
                          value={request}
                          placeholder="Descripción"
                          onChange={e => {
                              setRequest(e.target.value);
                          }}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                          inputProps={{ inputMode: 'text', style: { fontSize: '20px', minHeight: '20vh'} }}
                      />
                      <div className="row mt-4">
                          <div className="col-1">
                            </div>
                          <div className="col-4">
                              <button onClick={() => { handleClose(); }} style={gen}>Cancelar</button>
                          </div>
                          <div className="col-2">
                          </div>
                          <div className="col-4">
                              <button onClick={() => send()} style={gen}>Enviar</button>
                          </div>                      </div>
                  </FormControl>
              </Box>
          </Modal>
    </>

  );
};

export default UserMenu;