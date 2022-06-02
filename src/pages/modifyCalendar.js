import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTable from '../components/Calendar/calendar';
import CalendarForm from '../components/Calendar/calendarForm';
import LegendHeader from '../components/Calendar/legendHeader';
import "../components/Calendar/calendar.css";
import { getStartYear, dayInSeconds } from "../components/Calendar/getCalendarData";
import { getFirstSemester, deleteCalendarEINA, getSecondSemester, getSecondConvocatory } from '../api/calendar';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from '../components/NavBar/navbar';

const title = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    color: 'black',
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

const ModifyCalendar = () => {
    const history = useNavigate();

    const { course, version } = useParams();
    const [firstCalendarArray, setFirstCalendarArray] = useState([]);
    const [secondCalendarArray, setSecondCalendarArray] = useState([]);
    const [thirdCalendarArray, setThirdCalendarArray] = useState([]);

    useEffect(() => {
        fetchCalendar();
    }, []);

    async function fetchCalendar() {
        await getFirstSemester(course, version)
            .then(response => {
                var calendarArray = response;
                setFirstCalendarArray(calendarArray);
            });
        await getSecondSemester(course, version)
            .then(response => {
                var calendarArray = response;
                setSecondCalendarArray(calendarArray);
            });
        await getSecondConvocatory(course, version)
            .then(response => {
                var calendarArray = response;
                setThirdCalendarArray(calendarArray);
            });
    }

    function addOneDay(date) {
        return new Date(new Date(date).getTime() + dayInSeconds);
    }

    async function deleteCalendar() {
        await deleteCalendarEINA(course, version)
            .then(response => {
                if (!response) {
                    //error
                } else {
                    //éxito
                    history('/createCalendar');
                }
            });
        await fetchCalendar();
    }

    //Calendar
    const calendarComponent = (title, calendarArray, editable, enableHeader) => {
        return (<div> <br />
            <h2> {title} </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} editable={editable} fetchCalendar={fetchCalendar}
                enableHeader={enableHeader} course={course} version={version} />
            <br />
        </div>);
    };

    const CalendarRender = () => (<div id="Calendar">
        {firstCalendarArray.length > 0 ? calendarComponent("Primer semestre", firstCalendarArray, true, true) : null}
        {secondCalendarArray.length > 0 ? calendarComponent("Segundo semestre", secondCalendarArray, true, true) : null}
        {thirdCalendarArray.length > 0 ? calendarComponent("Período exámenes 2ª Convocatoria", thirdCalendarArray, true, false) : null}
        <br />
        {firstCalendarArray.length > 0 ? <LegendHeader /> : null}
    </div>);

    const savePdf = () => {
        if (firstCalendarArray.length > 0) {
            const input = document.getElementById('Calendar');
            html2canvas(input)
                .then((canvas) => {
                    let imgWidth = 200;
                    let imgHeight = 320;
                    const year = getStartYear();
                    const imgData = canvas.toDataURL('img/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(imgData, 'PNG', imgWidth * 0.1, imgHeight * 0.02, imgWidth * 0.8, imgHeight * 0.8);
                    pdf.save("calendario_" + (year - 1) + "_" + year + "v" + version + ".pdf");
                });
        }
    };

    return (
        <>
        <NavBar />
        <div style={body}>
            <div style={title}>
                <h1>Calendario Anual {course}v{version}</h1>
                <br />
                <br />
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ m: 1, fontSize: '20px' }}> {firstCalendarArray.length > 0 ? "Cambiar" : "Rellenar"} fechas de períodos </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CalendarForm option={firstCalendarArray.length > 0} course={course}
                            version={version} fetchCalendar={fetchCalendar} />
                    </AccordionDetails>
                </Accordion>
                <CalendarRender />
            </div>
            <br />
            <div style={buttonRow}>
                {firstCalendarArray.length > 0 ? <button onClick={savePdf} style={gen}>Exportar a PDF</button> : null}
                {firstCalendarArray.length > 0 ? <button onClick={() => deleteCalendar()} style={gen}>Eliminar</button> : null}
            </div>
            </div>
            </>
    );
};

export default ModifyCalendar;