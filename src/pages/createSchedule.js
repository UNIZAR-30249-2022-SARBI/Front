import React, { Component } from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Logo from '../assets/Logo.png';
import Schedule from '../components/Schedule/customSchedule';
import { Typography, MenuItem, FormControl, TextField, Select, Button } from '@mui/material';
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, DragAndDrop, Resize, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import CustomSchedule from '../components/Schedule/customSchedule';
import { getTeachingGroups } from '../api/schedule';
import { getSubjects } from '../api/subject';
import NavBar from '../components/NavBar/navbar';

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

const column = {
    display: 'flex',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '2%',
    marginRight: '5%',
};

const gen = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#685cf4",
    color: 'whitesmoke',
    borderRadius: '1vh',
    padding: '0.3vh 0.6vh'

};

const CreateSchedule = () => {
    const [career, setCareer] = useState('');
    const [course, setCourse] = useState('');
    const [group, setGroup] = useState('');
    const [semester, setSemester] = useState('');
    const [teachingGroups, setGroups] = useState([]);
    const [optionsCareer, setOptionsCareer] = useState([]);
    const [optionsCourse, setOptionsCourse] = useState([]);
    const [optionsGroups, setOptionsGroup] = useState([]);
    const [optionsSemester, setOptionsSemester] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect( () => {
        fetchTeachingGroups() 
    }, []);

    async function fetchTeachingGroups() {
        await getTeachingGroups()
            .then(response => {
                if (!response) {
                    alert("Se ha producido un error, inténtelo de nuevo.");
                } else {
                    console.log("RESP",response);
                    setGroups(response);
                    filterCareers(response);
                }
            }).catch(error => {
                alert("Se ha producido un error, inténtelo de nuevo.");
            });
    }

    const filterCareers = (groups) => {
        let arrayCareers = groups.map(group => group.career).filter((item, index, arr) => arr.lastIndexOf(item) == index).sort();
        setOptionsCareer(arrayCareers);
        setOptionsCourse([]);
        setOptionsGroup([]);
        setOptionsSemester([]);
    }

    const filterCourses = (select) => {
        let arrayCourse = teachingGroups.filter(g => g.career === select).map(group => group.course).filter((item, index, arr) => arr.lastIndexOf(item) == index).sort();
        console.log("CAR2", arrayCourse)
        setOptionsCourse(arrayCourse)
    }

    const filterGroups = (select) => {
        let arrayGroups = teachingGroups.filter(g => g.career === career && g.course === select).map(group => group.code).filter((item, index, arr) => arr.lastIndexOf(item) == index).sort();
        console.log("CAR3", arrayGroups, select);
        setOptionsGroup(arrayGroups)
    }

    const filterSemester = (select) => {
        let arraySemester = teachingGroups.filter(g => g.career === career && g.course === course && g.code===select).map(group => group.period).filter((item, index, arr) => arr.lastIndexOf(item) == index).sort();
        console.log("CAR4", arraySemester, select);
        setOptionsSemester(arraySemester)
    }

    const careerChangeHandler = (career) => {
        console.log("CAR", career)
        setCareer(career);
        filterCourses(career);
    };

    const courseChangeHandler = (course) => {
        setCourse(course);
        filterGroups(course);
    };
    const groupChangeHandler = (group) => {
        setGroup(group);
        filterSemester(group);
    };
    const semesterChangeHandler = async (semester) => {
        setSemester(semester);
        console.log("OP",group, semester)
        await getSubjects(group, semester)
            .then(response => {
                if (!response) {
                    alert("Se ha producido un error, inténtelo de nuevo.");
                } else {
                    console.log("SUB",response)
                    setSubjects(response);
                }
            }).catch(error => {
                alert("Se ha producido un error, inténtelo de nuevo.");
            });
    };

    const showValues = () => {
        console.log("Career: " + career);
        console.log("Course: " + course);
        console.log("Group: " + group);
        console.log("Semester: " + semester);
    };

    return (
        <div className="container-fluid">
            <NavBar />
            <div class="row" style={column}>
                <div className="h1">
                    <h1>Horario</h1>
                </div>
                <div className="row m-4">
                    <div className="col-6">
                        <FormControl variant="standard" sx={{minWidth: '15vw' }}>
                            <Typography variant="h5" gutterBottom>
                                Seleccionar plan de estudios
                            </Typography>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={career}
                                onChange={e => careerChangeHandler(e.target.value)}
                                sx={{ minWidth: '40vw', fontSize: '20px' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {optionsCareer.map((c) => {
                                    return <MenuItem sx={{ fontSize: '20px' }} value={c}>{c}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        
                    </div>
                    <div className="col-2">
                        <FormControl variant="standard" sx={{ minWidth: '8vw' }}>
                            <Typography variant="h5" gutterBottom>
                                Seleccionar curso
                            </Typography>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={course}
                                onChange={e => courseChangeHandler(e.target.value)}
                                sx={{ minWidth: '10vw', fontSize: '20px' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {optionsCourse.map((c) => {
                                    return <MenuItem sx={{ fontSize: '20px' }} value={c}>{c}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                       
                    </div>
                    <div className="col-2">
                        <FormControl variant="standard" sx={{ minWidth: '8vw' }}>
                            <Typography variant="h5" gutterBottom>
                                Seleccionar Grupo
                            </Typography>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={group}
                                onChange={e => groupChangeHandler(e.target.value)}
                                sx={{ minWidth: '10vw', fontSize: '20px' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {optionsGroups.map((c) => {
                                    return <MenuItem sx={{ fontSize: '20px' }} value={c}>{c}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        
                    </div>
                    <div className="col-2">
                        <FormControl variant="standard" sx={{ minWidth: '10vw' }}>
                            <Typography variant="h5" gutterBottom>
                                Seleccionar semestre
                            </Typography>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={semester}
                                onChange={e => semesterChangeHandler(e.target.value)}
                                sx={{ minWidth: '10vw', fontSize: '20px' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {optionsSemester.map((c) => {
                                    return <MenuItem sx={{ fontSize: '20px' }} value={c}>{c}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        
                    </div>
                </div>
                <div className="row">
                
                </div>
            
                <div className="row mt-4 mb-4">
                    <div className="col-6"></div>
                    <div className="col-3">
                        <button onClick={showValues} style={gen}>Generar</button>
                    </div>
                    <div className="col-3"></div>
                </div>

                <CustomSchedule />
            </div>
        </div>
    )
}

export default CreateSchedule