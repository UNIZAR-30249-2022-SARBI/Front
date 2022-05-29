import React, { Component } from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logo from '../assets/Logo.png';
import Select from 'react-select'
import Schedule from '../components/Schedule/customSchedule';
import { Typography, TextField, Button } from '@mui/material';
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, DragAndDrop, Resize, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import CustomSchedule from '../components/Schedule/customSchedule';

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
    marginLeft: '-30vh',
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


const ViewSchedule = () => {
    const [career, setCareer] = useState('');
    const [course, setCourse] = useState('');
    const [group, setGroup] = useState('');
    const [semester, setSemester] = useState('');

    useEffect(() => {

    }, []);

    const optionsCareer = [
        { value: 'Ingeniería informática', label: 'Ingeniería informática' },
    ]

    const optionsCurso = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ]

    const optionsGrupo = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ]

    const optionsSemester = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
    ]

    const careerChangeHandler = (change) => {
        setCareer(change.value);
    };
    const courseChangeHandler = (change) => {
        setCourse(change.value);
    };
    const groupChangeHandler = (change) => {
        setGroup(change.value);
    };
    const semesterChangeHandler = (change) => {
        setSemester(change.value);
    };

    const showValues = () => {
        console.log("Career: " + career);
        console.log("Course: " + course);
        console.log("Group: " + group);
        console.log("Semester: " + semester);
    };

    return (
        <div>


            <div className="h1">
                <h1>Horario</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <label>Seleccionar plan de estudios</label>
                    <div className="dropdown-item">
                        <Select options={optionsCareer} onChange={careerChangeHandler}></Select>
                    </div>
                </div>
                <div className="col-6">
                    <label>Seleccionar Curso</label>
                    <div className="dropdown-item">
                        <Select options={optionsCurso} onChange={courseChangeHandler}></Select>
                    </div>
                </div>
                <div className="col-6">
                    <label>Grupo</label>
                    <div className="dropdown-item">
                        <Select options={optionsGrupo} onChange={groupChangeHandler}></Select>
                    </div>
                </div>
                <div className="col-6">
                    <label>Semestre</label>
                    <div className="dropdown-item">
                        <Select options={optionsSemester} onChange={semesterChangeHandler}></Select>
                    </div>
                </div>
            </div>

            <CustomSchedule />

        </div>
    )
}

export default ViewSchedule