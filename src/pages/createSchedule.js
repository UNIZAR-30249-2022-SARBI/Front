import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logo from '../assets/Logo.png';
import Select from 'react-select'




const title = {
    display: 'flex',
    marginTop: '8vh',
    color: 'black',
    marginLeft: '5vh',
    height: '10vh',
};

const row = {
    display: 'flex',
    marginTop: '2vh',
    color: 'black',
    marginLeft: '12vh',
    alignItems: 'center',

};

const logo = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6vh',
    marginLeft: '-8vh',
    width: '1px',
    height: '1px'
  };


const drop = {
    marginTop: '1vh',
    marginLeft: '0vh',
    marginRight: '-3vh',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-between', 
}

const column = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0vh',
    marginBottom: '2vh',
    alignItems: 'center',
    marginLeft: '-130vh',
};

const column2 = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-12vh',
    justifyContent: 'center',
    marginLeft: '55vh',
    marginRight: '2vh',
};

const column3 = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-10vh',
    justifyContent: 'center',
    marginLeft: '85vh',
    marginRight: '2vh',
};

const column4 = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-10vh',
    justifyContent: 'center',
    marginLeft: '115vh',
    marginRight: '2vh',
};

const body ={
    padding: '0.5rem calc((100vw - 165vh) / 3)',
}


const CreateSchedule = () => {  


    useEffect(() => {        
        
    }, []);

    const options = [
        { value: 'ingenieria', label: 'Ingeniería informática' },
    ]

    const optionsCurso = [
        { value: 'primero', label: 'Primero' },
    ]

    return(
        <div style={body}>
             <div style={logo}>
                 <img src={Logo} width="140px" height="140px" alt="Logo" />
            </div>
            <div style={title}>
                <h1>Horario</h1>
            </div>
            <div style={column}>
                <label>Seleccionar plan de estudios</label>
                <div style={drop}>
                    <Select options={options}></Select>
                </div>
            </div>
            <div style={column2}>
                <label>Seleccionar Curso</label>
                <div style={drop}>
                    <Select options={optionsCurso}></Select>
                </div>
            </div>
            <div style={column3}>
                <label>Grupo</label>
                <div style={drop}>
                    <Select options={optionsCurso}></Select>
                </div>
            </div>
            <div style={column4}>
                <label>Semestre</label>
                <div style={drop}>
                    <Select options={optionsCurso}></Select>
                </div>
            </div>            
        </div>

    )
}

export default CreateSchedule