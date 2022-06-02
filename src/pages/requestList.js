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
import { Typography, FormControl, TextField } from '@mui/material';

import { listRequest, acceptRequest, rejectRequest } from '../api/request';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


const plusGen = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#685cf4",
    color: 'whitesmoke',
    borderRadius: '1vh',
    fontSize: '20px',
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

const RequestList = () => {

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
        fetchRequests();
    }, []);
    let isMobile = (width <= 768);

    const [open, setOpen] = React.useState(false);
    const handleOpen = (req) => {
        setSelectRequest(req);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [comment, setComment] = React.useState("");
    const [requests, setListRequest] = React.useState([{
        "id": 1,
        "description": "testing description",
        "email": "779799@unizar.es",
    }]);
    const [selectRequest, setSelectRequest] = React.useState(
        {
            "id": 1,
            "description": "testing description",
            "email": "779799@unizar.es",
        });
    async function fetchRequests() {
        console.log("FETCH")

        await listRequest()
            .then(response => {
                console.log(response)
                setListRequest(response);
            }).catch(err => {
                alert("Se ha producido un error, inténtelo de nuevo.");
            });
    }

    async function accept() {
        console.log("ID", selectRequest)

        await acceptRequest (selectRequest.id, comment)
            .then(response => {
                alert("Petición resuelta correctamente");
            }).catch(err => {
                alert("Se ha producido un error, inténtelo de nuevo.");
            });
        handleClose();
        await fetchRequests();
    }

    async function reject() {
        console.log("ID",selectRequest)
        await rejectRequest(selectRequest.id, comment)
            .then(response => {
                alert("Petición resuelta correctamente");
            }).catch(err => {
                alert("Se ha producido un error, inténtelo de nuevo.");
            });
        handleClose();
        await fetchRequests();
    }

  return (
    <>
          <NavBar />
          <div className="m-1 mt-4">
              <div className="m-4">
                  <h1>Peticiones</h1>
              </div>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: '80vw' }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="right">Descripción</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Estado</TableCell>
                          <TableCell align="right">
                          </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {requests?.map((req) => (
                          <TableRow
                              key={req.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell align="right">{req.description}</TableCell>
                              <TableCell align="right">{req.email}</TableCell>
                              <TableCell align="right">Pendiente</TableCell>
                              <TableCell align="right">
                                  <button onClick={() => handleOpen(req)} style={plusGen}>+</button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
              </TableContainer>
              </div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <FormControl variant="standard" sx={{ m: 10, minWidth: '20vw' }}>
                      <Typography variant="h4" gutterBottom>
                          Petición
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                          Descripción: {selectRequest.description}
                      </Typography>
                      <TextField
                          id="standard-number"
                          type="text"
                          value={comment}
                          placeholder="Comentario"
                          onChange={e => {
                              setComment(e.target.value);
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
                          <div className="col-3 me-3">
                              <button onClick={() => { handleClose(); }} style={gen}>Cancelar</button>
                          </div>
                          <div className="col-3 me-2">
                              <button onClick={() => accept()} style={gen}>Aceptar</button>
                          </div>
                          <div className="col-3">
                              <button onClick={() => reject()} style={gen}>Rechazar</button>
                          </div>                      </div>
                  </FormControl>
              </Box>
          </Modal>
    </>

  );
};

export default RequestList;