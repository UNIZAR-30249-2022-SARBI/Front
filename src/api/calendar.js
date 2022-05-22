import axios from 'axios';

const url = 'http://localhost:3001/';

export function createYearCalendar(periods, course, version) {
    return axios.post(url + 'createCalendarEINA', {
        periods: {
            firstSemester: {
                startDate: periods.startFirstQuarter,
                endDate: periods.endFirstQuarter
            },
            secondSemester: {
                startDate: periods.startSecondQuarter,
                endDate: periods.endSecondQuarter,
            },
            secondConvocatory: {
                startDate: periods.startSecondConvocatory,
                endDate: periods.endSecondConvocatory,
            }
        },
        course: course,
        version: version
    })
        .then(async (response) => {
            return response;
        }) 
}

export function editCalendar(periods, course, version) {
    return axios.post(url + 'editCalendarEINA', {
        course: course,
        version: version,
        periods: {
            firstSemester: {
                startDate: periods.startFirstQuarter,
                endDate: periods.endFirstQuarter
            },
            secondSemester: {
                startDate: periods.startSecondQuarter,
                endDate: periods.endSecondQuarter,
            },
            secondConvocatory: {
                startDate: periods.startSecondConvocatory,
                endDate: periods.endSecondConvocatory,
            }
        },
    })
        .then(async (response) => {
            return response;
        });
}

export function createEmptyCalendar(course, version) {

    return axios.post(url + 'createCalendarEINA', {
        course: course,
        version: version
    })
        .then(async (response) => {
            if(response.data) await deleteCalendarEINA(course, version)
            return response.data;
        });
}

export function getCalendars() {
    return axios.get(url + 'listAllCalendars')
        .then(async (response) => {
            return response.data;
        });
}

export function getPeriods(course, version) {
    return axios.get(url + 'listPeriodsCalendarEINA/'+course+"/"+version)
        .then(async (response) => {
            return response.data;
        });
}

export function getFirstSemester(course, version) {
    return axios.get(url + 'listFirstSemesterCalendarEINA/' + course + "/" + version)
        .then(async (response) => {
            return response.data;
        });
}

export function getSecondSemester(course, version) {
    return axios.get(url + 'listSecondSemesterCalendarEINA/' + course + "/" + version)
        .then(async (response) => {
            return response.data;
        });
}

export function getSecondConvocatory(course, version) {
    return axios.get(url + 'listSecondConvocatoryCalendarEINA/' + course + "/" + version)
        .then(async (response) => {
            return response.data;
        });
}

export function deleteCalendarEINA(course, version) {
    return axios.post(url + 'deleteCalendarEINA', {
        course: course,
        version: version
    })
        .then(async (response) => {
            return response;
        });
}

export function editDayEINA(dayEINA, course, version) {
    return axios.post(url + 'editDayEINA', {
        dayData: {
            date: dayEINA.date,
            day: dayEINA.day,
            week: dayEINA.week,
            type: dayEINA.type,
            comment: dayEINA.comment,
        },
        course: course,
        version: version
    })
        .then(async (response) => {
            return response;
        });
}