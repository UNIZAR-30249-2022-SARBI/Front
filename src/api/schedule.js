import axios from 'axios';

const url = 'http://localhost:3001/';

export function createSchedule(career, course, group, semester, data) {
    return axios.post(url + 'createSchedule', {
        career: career,
        course: course,
        group: group,
        semester: semester,
        data: data
    })
        .then(async (response) => {
            return response;
        }) 
}

export function editSchedule(career, course, group, semester, data) {
    return axios.post(url + 'editSchedule', {
        career: career,
        course: course,
        group: group,
        semester: semester,
        data: data
    })
        .then(async (response) => {
            return response;
        }) 
}

export function createEmptySchedule(career, course, group, semester) {
    return axios.post(url + 'createEmptySchedule', {
        career: career,
        course: course,
        group: group,
        semester: semester,
    })
        .then(async (response) => {
            return response;
        }) 
}

export function getSchedules() {
    return axios.get(url + 'listAllSchedules')
        .then(async (response) => {
            return response.data;
        });
}

export function getScheduleData(career, course, group, semester) {
    return axios.get(url + 'getScheduleData' + career + "/" + course + "/" + group + "/" + semester)
        .then(async (response) => {
            return response.data;
        });
}

export function deleteSchedule(career, course, group, semester) {
    return axios.post(url + 'deleteSchedule', {
        career: career,
        course: course,
        group: group,
        semester: semester
    })
        .then(async (response) => {
            return response;
        });
}
