import axios from 'axios';

const url = 'http://localhost:3001/';

export function createYearCalendar(periods) {

    return axios.post(url + 'createCalendarEINA', {
        periods: {
            startFirstSemester: periods.startFirstQuarter,
            endFirstSemester: periods.endFirstQuarter,
            startSecondSemester: periods.startSecondQuarter,
            endSecondSemester: periods.endSecondQuarter,
            startSecondConvocatory: periods.startSecondConvocatory,
            endSecondConvocatory: periods.endSecondConvocatory
        },
        course: '2021-22',
        version:1
    })
        .then(async (response) => {
            console.log(response);
            return response;
        }) 
}

export function getFirstSemester() {
    return axios.post(url + 'listFirstSemesterCalendarEINA', {
        course: '2021-22',
        version: 1
    })
        .then(async (response) => {
            return response.data;
        });
}
export function getSecondSemester() {
    return axios.post(url + 'listSecondSemesterCalendarEINA', {
        course: '2021-22',
        version: 1
    })
        .then(async (response) => {
            return response.data;
        });
}
export function getSecondConvocatory() {
    return axios.post(url + 'listSecondConvocatoryCalendarEINA', {
        course: '2021-22',
        version: 1
    })
        .then(async (response) => {
            return response.data;
        });
}
export function deleteCalendarEINA() {
    console.log(' deleting')
    return axios.post(url + 'deleteCalendarEINA', {
        course: '2021-22',
        version: 1
    })
        .then(async (response) => {
            return response;
        });
}
export function editDayEINA(dayEINA) {
    console.log(' editDayEINA');
    return axios.post(url + 'editDayEINA', {
        dayData: {
            date: dayEINA.date,
            day: dayEINA.day,
            week: dayEINA.week,
            type: dayEINA.type,
            comment: dayEINA.comment,
        },
        course: '2021-22',
        version: 1
    })
        .then(async (response) => {
            return response;
        });
}