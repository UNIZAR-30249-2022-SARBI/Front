import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import "./customSchedule.css";
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, DragAndDrop, Resize, EventSettingsModel, Month } from "@syncfusion/ej2-react-schedule";
import { Typography, TextField, Button } from '@mui/material';
import { getScheduleData } from "../../api/schedule.js";

class CustomSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ctx: {}
        }
    }

    toJavascriptDate(s) {
        s = s + ''
        var b = s.split(/\D+/);
        var anyo = parseInt(b[0])
        var mes = parseInt(b[1])
        var dia = parseInt(b[2])
        var hora = parseInt(b[3])
        var minuto = parseInt(b[4])
        var dateAux = new Date(Date.UTC(anyo, mes-1, dia, hora, minuto, 0))
        return dateAux;
      }

    async loadSchedule(){    
        let fetchedData = getScheduleData(this.state.ctx.career, this.state.ctx.course, this.state.ctx.group, this.state.ctx.semester);
        if (fetchedData != undefined) {
            this.state.data = []
            var dataAux = fetchedData
            var dataAux2 = this.state.data
            var dataAux3
            for (var i = 0; i < dataAux.length; i++) {
                dataAux3 = dataAux[i]
                dataAux3.StartTime = this.toJavascriptDate(dataAux[i].StartTime)
                dataAux3.EndTime = this.toJavascriptDate(dataAux[i].EndTime)
                dataAux2.push(dataAux3)
            }
            this.state.data = dataAux2
            this.setState({ data: dataAux2, ctx: this.state.ctx })
        } 
        this.setState({
            data: [{
                Id: 1,
                Subject: 'Testing',
                StartTime: new Date(2022, 5, 2, 9, 30),
                EndTime: new Date(2022, 5, 2, 11, 0),
                IsAllDay: true,
            }]
        })
      }

    componentDidMount() {
        this.loadSchedule();
    }

    storeSchedule() {
        console.log("stored schedule");
    }

    render() {
        for (let i = 0; i < this.state.data.length; i++ ) {
            console.log(this.state.data);
        }
        if (this.state.data.length == 0) {
            console.log("NOT INIT");
            return <div />
        }
        console.log("INIT");
        return (
            <div >
                <ScheduleComponent>
                    <ViewsDirective>
                        <ViewDirective option='WorkWeek' currentView='WorkWeek' selectedDate={new Date(2021, 8, 13)} startHour='08:00' endHour='21:00' showWeekNumber={true} eventSettings={{ dataSource: this.state.data }}/>
                    </ViewsDirective>
                    <Inject services={[WorkWeek, DragAndDrop, Resize, Month]} />

                </ScheduleComponent>
                <div className="row">
                    <Button variant="contained" onClick={this.storeSchedule}>Guardar</Button>
                </div>
            </div>
        );
    }
}

export default CustomSchedule