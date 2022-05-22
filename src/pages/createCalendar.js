import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import "../components/Calendar/calendar.css";
import { dayInSeconds } from "../components/Calendar/getCalendarData";
import { Typography, MenuItem, FormControl, TextField, Select} from '@mui/material';
import { getCalendars, createEmptyCalendar} from '../api/calendar';

const title = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    color: 'black',
    marginBottom:'2vh'
};

const gen = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#685cf4",
    color: 'whitesmoke',
    borderRadius: '1vh',
    padding: '0.3vh 0.6vh'

};

const body = {
    padding: '2rem calc((100vw - 165vh) / 3)',
};

const buttonRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '3vh',
    color: 'black',
    fontSize: 'larger'
};

const Form = () => {
    const history = useNavigate();
    const [versionCourseList, setVersionCourseList] = useState([{ version: 1, course: '2022-21' }]);
    const [newCourse, setNewCourse] = useState('')
    const [newVersion, setNewVersion] = useState('')
    const [courseVersion, setCourseVersion] = useState('')
    const [errorMode, setErrorMode] = useState(false)
    const handleChangeDate = (newValue) => {
        setValue(newValue);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        fetchCalendars();
    }, []);

    async function fetchCalendars() {
        await getCalendars()
            .then(response => {
                setVersionCourseList(response);
            });
    }

    function addOneDay(date) {
        return new Date(new Date(date).getTime() + dayInSeconds);
    }

    function addOneDayArray(array) {
        return [...array].map(function (elem) {
            return { startDate: addOneDay(elem.startDate), endDate: addOneDay(elem.endDate), comment: elem.comment };
        });
    }

    const courseVersionParse = (course, version) => {
        return course + 'v' + version;
    }

    const goToModifyCalendar = () => {
        let array = courseVersion.split('v');
        history("/modifyCalendar/" + array[0] + "/" + array[1]);
    };

    const checkAndGoToModify = async () => {
        console.log("new")
        console.log(newCourse)
        console.log(newVersion)
        await createEmptyCalendar(newCourse, newVersion)
            .then(response => {
                console.log(response)
                if (response) {
                    history("/modifyCalendar/" + newCourse + "/" + newVersion);
                }
                else
                    setErrorMode(true)
        });
    };

    return (
        <div style={body}>
            <div style={title}>
                <h1>Calendario Anual</h1>
            </div>
                <FormControl variant="standard" sx={{ m: 4, minWidth: '15vw'}}>
                    <Typography variant="h5" gutterBottom>
                        Selección una versión del calendario:
                    </Typography>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                    value={courseVersion}
                    onChange={e => setCourseVersion(e.target.value)}
                        sx={{ minWidth: '6vw', fontSize: '25px'}}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {versionCourseList.map((c) => {
                            let format = courseVersionParse(c.course, c.version);
                            return <MenuItem sx={{ fontSize: '25px' }} value={format}>{format}</MenuItem>;
                        })}
                    </Select>
            </FormControl>
            <div style={buttonRow}>
                <button onClick={goToModifyCalendar} style={gen}>Visualizar</button>
            </div>
            <div>
                <FormControl variant="standard" sx={{ m: 8, minWidth: '15vw' }}>
                    <Typography variant="h5" sx={{ m: 6 }} gutterBottom>
                    O crea una nueva versión:
                </Typography> 
                        <Typography variant="h6" gutterBottom>
                            Curso acádemico
                        </Typography>

                        <TextField
                            id="standard-number"
                        type="text"
                        value={newCourse}
                        onChange={e => {
                            setNewCourse(e.target.value);
                            setErrorMode(false)
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        inputProps={{ inputMode: 'text', style: {fontSize:'25px'}}}
                                />
                    <Typography variant="h6" sx={{ marginTop: 2 }} gutterBottom>
                            Versión
                        </Typography>
                        <TextField
                            id="standard-number"
                            type="number"
                        value={newVersion}
                        onChange={e => {
                            setNewVersion(e.target.value);
                            setErrorMode(false)
                        }}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        inputProps={{ inputMode: 'text', pattern: '[0-9]*', style: { fontSize: '25px' } }}
                            />
                </FormControl>
                {errorMode ? <p style={{ color: 'red' }}>No se ha podido crear el calendario {newCourse}v{newVersion}</p>:null}
                </div>
            <div style={buttonRow}>
                <button onClick={checkAndGoToModify} style={gen}>Crear</button>
            </div>
        </div>
    );
};

export default Form;