import axios from 'axios';

const url = 'http://localhost:3001/';

export function createYearCalendar(periods) {

    return axios.post(url + 'createCalendarEINA', {
        startFirstSemester: periods.startFirstQuarter,
        endFirstSemester: periods.endFirstQuarter,
        startSecondSemester: periods.startSecondQuarter,
        endSecondSemester: periods.endSecondQuarter,
        startSecondConvocatory: periods.startSecondConvocatory,
        endSecondConvocatory: periods.endSecondConvocatory
    })
        .then(async (response) => {
            console.log(response);
            return response;
        })
}

export function getFirstSemester() {
    return axios.post(url + 'listFirstSemesterCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            return response.data;
        });
}
export function getSecondSemester() {
    return axios.post(url + 'listSecondSemesterCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            return response.data;
        });
}
export function getSecondConvocatory() {
    return axios.post(url + 'listSecondConvocatoryCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            return response.data;
        });
}
export function deleteCalendarEINA() {
    console.log(' deleting')
    return axios.post(url + 'deleteCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            return response;
        });
}
export function editDayEINA(dayEINA) {
    console.log(' editDayEINA');
    return axios.post(url + 'editDayEINA', {
        date: dayEINA.date,
        day: dayEINA.day,
        week: dayEINA.week,
        type: dayEINA.type,
        comment: dayEINA.comment,
    })
        .then(async (response) => {
            return response;
        });
}