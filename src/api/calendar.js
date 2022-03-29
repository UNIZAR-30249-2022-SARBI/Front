import axios from 'axios';

const url = 'http://localhost:3001/';

export function createYearCalendar(periods) {

    var startFirstSemester = new Date('2021-09-15');
    var endFirstSemester = new Date('2022-02-06');
    var startSecondSemester = new Date('2022-02-07');
    var endSecondSemester = new Date('2022-07-22');
    var startSecondConvocatory = new Date('2022-08-31');
    var endSecondConvocatory = new Date('2022-09-13');
    return axios.post(url + 'createCalendarEINA', {
        startFirstSemester: startFirstSemester,
        endFirstSemester: endFirstSemester,
        startSecondSemester: startSecondSemester,
        endSecondSemester: endSecondSemester,
        startSecondConvocatory:startSecondConvocatory,
        endSecondConvocatory: endSecondConvocatory
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
            console.log("FIRSTCON" + JSON.stringify(response.data));
            return response.data;
        });
}
export function getSecondSemester() {
    return axios.post(url + 'listSecondSemesterCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            console.log("FIRSTCON" + JSON.stringify(response.data));
            return response.data;
        });
}
export function getSecondConvocatory() {
    return axios.post(url + 'listSecondConvocatoryCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            console.log("FIRSTCON" + JSON.stringify(response.data));
            return response.data;
        });
}
export function deleteCalendarEINA() {
    console.log(' deleting')
    return axios.post(url + 'deleteCalendarEINA', {
        year: 2021,
    })
        .then(async (response) => {
            console.log("FIRSTCON" + JSON.stringify(response));
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
            console.log("FIRSTCON" + JSON.stringify(response));
            return response;
        });
}