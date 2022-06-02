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
import UserNavBar from '../components/NavBar/userNavbar';

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

const UserCalendar = () => {
    const history = useNavigate();
    const [firstCalendarArray, setFirstCalendarArray] = useState([]);
    const [secondCalendarArray, setSecondCalendarArray] = useState([]);
    const [thirdCalendarArray, setThirdCalendarArray] = useState([]);
    let course = "2021-22";
    let version = 1;
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
        {firstCalendarArray.length > 0 ? calendarComponent("Primer semestre", firstCalendarArray, false, true) : null}
        {secondCalendarArray.length > 0 ? calendarComponent("Segundo semestre", secondCalendarArray, false, true) : null}
        {thirdCalendarArray.length > 0 ? calendarComponent("Período exámenes 2ª Convocatoria", thirdCalendarArray, false, false) : null}
        <br />
        {firstCalendarArray.length > 0 ? <LegendHeader /> : null}
    </div>);



    return (
        <>
        <UserNavBar />
        <div style={body}>
            <div style={title}>
                <h1>Calendario Anual {course}v{version}</h1>
                <br />
                <br />
            </div>
            <div>
                <CalendarRender />
            </div>
            <br />
            </div>
        </>
    );
};

export default UserCalendar;