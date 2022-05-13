import React from 'react';
import { useState, useEffect, useRef } from "react";
import {
    InputLabel, Typography, MenuItem, FormControl, TextField, Select,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import "./calendar.css";
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const CalendarForm = ({option}) => {
    const [startFirstQuarter, setStartFirstQuarter] = useState(new Date('2021-09-15'));
    const [endFirstQuarter, setEndFirstQuarter] = useState(new Date('2022-02-06'));
    const [startSecondQuarter, setStartSecondQuarter] = useState(new Date('2022-02-07'));
    const [endSecondQuarter, setEndSecondQuarter] = useState(new Date('2022-07-22'));
    const [startSecondConvocatory, setStartSecondConvocatory] = useState(new Date('2022-08-31'));
    const [endSecondConvocatory, setEndSecondConvocatory] = useState(new Date('2022-09-13'));
    async function saveQuarters() {
        let quarters = {
            startFirstQuarter: startFirstQuarter,
            endFirstQuarter: endFirstQuarter,
            startSecondQuarter: startSecondQuarter,
            endSecondQuarter: endSecondQuarter,
            startSecondConvocatory: startSecondConvocatory,
            endSecondConvocatory: endSecondConvocatory
        };
        await createYearCalendar(quarters)
            .then(response => {
                if (!response.data) {
                    //error
                } else {
                    //éxito
                }
            });
        await fetchCalendar();
    }
    return (
        <div class="form">
            <div class="inputAlign">
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
            <div class="inputAlign">
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

            <div class="inputAlign">
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

            <div class="buttonAlign">
                {option === 0 ? <button onClick={() => saveQuarters()} class="genButton">Generar</button> :
                    <button onClick={() => modifyQuaters()} class="genButton">Modificar</button>}

                </div>
        </div>

        )
}

export default CalendarForm;

