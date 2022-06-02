import { useEffect, useState } from 'react';
import Logo from '../../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { ReactSession } from 'react-client-session';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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

const UserNavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();

    const email = ReactSession.get("email");

    useEffect(() => {

    }, []);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="container-fluid" style={{ backgroundColor:'#c7ffe3'}}>
            <div className="row">
                <div className="col-4 ms-2">
                    <button style={{
                        backgroundColor: 'transparent', borderWidth:0}}><img src={Logo} width="160" height="160" alt="Logo" onClick={() => navigate("/userMenu")} /></button>
                </div>
                <div className="col-5 me-5">
                </div>
                <div className="col-2 mt-5 ms-5" aligh="left">
                    <div>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            style={{
                                color: 'whitesmoke',
                                backgroundColor: "#685cf4",
                                borderRadius: '1vh',
                                padding: '0.8vh 2vw',
                                fontSize:'1vw'
                            }}
                        >
                            {email ? email : "Menú"}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => navigate("/userCalendar")}>Calendario</MenuItem>
                            <MenuItem onClick={() => navigate("/userSchedule")}>Horarios</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserNavBar;