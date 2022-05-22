import React from 'react';
import { useState, useEffect } from "react";
import { Typography, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import "./calendar.css";
import { createYearCalendar, editCalendar, getPeriods } from '../../api/calendar';


const CalendarForm = ({option, course, version, fetchCalendar}) => {
    const [startFirstQuarter, setStartFirstQuarter] = useState(new Date('2021-09-15'));
    const [endFirstQuarter, setEndFirstQuarter] = useState(new Date('2022-02-06'));
    const [startSecondQuarter, setStartSecondQuarter] = useState(new Date('2022-02-07'));
    const [endSecondQuarter, setEndSecondQuarter] = useState(new Date('2022-07-22'));
    const [startSecondConvocatory, setStartSecondConvocatory] = useState(new Date('2022-08-31'));
    const [endSecondConvocatory, setEndSecondConvocatory] = useState(new Date('2022-09-13'));
    const [errorMode, setErrorMode] = useState(false)

    useEffect(() => {
        fetchPeriods();
    }, []);

    async function fetchPeriods() {
        await getPeriods(course, version)
            .then(response => {
               setStartFirstQuarter( response.firstSemester.startDate)
                setEndFirstQuarter( response.firstSemester.endDate)
                setStartSecondQuarter (response.secondSemester.startDate)
                setEndSecondQuarter (response.secondSemester.endDate)
                setStartSecondConvocatory (response.secondConvocatory.startDate)
                setEndSecondConvocatory (response.secondConvocatory.endDate)
            });
    }

    async function saveQuarters() {
        await createYearCalendar(quarters, course, version)
            .then(async response => {
                if (!response.data) {
                    //error
                } else {
                    await fetchCalendar();
                }
            });
    }

    async function saveQuarters() {
        let quarters = {
            startFirstQuarter: startFirstQuarter,
            endFirstQuarter: endFirstQuarter,
            startSecondQuarter: startSecondQuarter,
            endSecondQuarter: endSecondQuarter,
            startSecondConvocatory: startSecondConvocatory,
            endSecondConvocatory: endSecondConvocatory
        };
        await createYearCalendar(quarters, course, version)
            .then(async response => {
                if (!response.data) {
                    //error
                } else {
                    await fetchCalendar();
                }
            });
    }
    async function modifyQuaters() {
        let quarters = {
            startFirstQuarter: startFirstQuarter,
            endFirstQuarter: endFirstQuarter,
            startSecondQuarter: startSecondQuarter,
            endSecondQuarter: endSecondQuarter,
            startSecondConvocatory: startSecondConvocatory,
            endSecondConvocatory: endSecondConvocatory
        };
        await editCalendar(quarters, course, version)
            .then(async response => {
                if (!response.data) {
                    setErrorMode(true)
                } else {
                    await fetchCalendar();
                }
            });
    }
    return (
        <div className="form">
            <div className="inputAlign">
                <Typography variant="h4" gutterBottom>
                    Primer cuatrimestre
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Comienzo"
                        inputFormat="dd/MM/yyyy"
                        size="large"
                        value={startFirstQuarter}
                        onChange={setStartFirstQuarter}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Fin"
                        inputFormat="dd/MM/yyyy"
                        value={endFirstQuarter}
                        onChange={setEndFirstQuarter}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <br />
            <div className="inputAlign">
                <Typography variant="h4" gutterBottom>
                    Segundo cuatrimestre
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Comienzo"
                        inputFormat="dd/MM/yyyy"
                        size="large"
                        value={startSecondQuarter}
                        onChange={setStartSecondQuarter}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Fin"
                        inputFormat="dd/MM/yyyy"
                        value={endSecondQuarter}
                        onChange={setEndSecondQuarter}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <br />

            <div className="inputAlign">
                <Typography variant="h4" gutterBottom>
                    Segunda convocatoria
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Comienzo"
                        inputFormat="dd/MM/yyyy"
                        size="large"
                        value={startSecondConvocatory}
                        onChange={setStartSecondConvocatory}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Fin"
                        inputFormat="dd/MM/yyyy"
                        value={endSecondConvocatory}
                        onChange={setEndSecondConvocatory}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <br />
            {errorMode ? <p style={{ color: 'red' }}>No se ha podido actualizar el calendario</p> : null}
            <div className="buttonAlign">
                {!option ? <button onClick={() => saveQuarters()} className="genButton">Generar</button> :
                    <button onClick={() => modifyQuaters()} className="genButton">Modificar</button>}
            </div>
        </div>

        )
}

export default CalendarForm;

