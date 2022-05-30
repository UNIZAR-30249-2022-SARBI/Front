import axios from 'axios';

const url = 'http://localhost:3001/';

export function createSchedule(groupType, groupNumber, career, course, code, period, subjectIds, scheduleSlots) {
    return axios.post(url + 'createSchedule', {
        groupType: groupType,
        groupNumber: groupNumber,
        teachingGroup: {
            career: career,
            course: course,
            code: code,
            period: period
        },
        subjectIds: subjectIds,
        scheduleSlots: scheduleSlots
    })
        .then(async (response) => {
            return response;
        }) 
}

export function editSchedule(groupType, groupNumber, career, course, code, period, subjectIds, scheduleSlots) {
    return axios.post(url + 'editSchedule', {
        groupType: groupType,
        groupNumber: groupNumber,
        teachingGroup: {
            career: career,
            course: course,
            code: code,
            period: period
        },
        subjectIds: subjectIds,
        scheduleSlots: scheduleSlots
    })
        .then(async (response) => {
            return response;
        }) 
}

export function createEmptySchedule(groupType, groupNumber, career, course, code, period) {
    return axios.post(url + 'createEmptySchedule', {
        groupType: groupType,
        groupNumber: groupNumber,
        teachingGroup: {
            career: career,
            course: course,
            code: code,
            period: period
        }
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

export function getScheduleData(groupType, groupNumber, career, course, code, period) {
    return axios.get(url + 'getScheduleData' + groupType + "/" + groupNumber + "/" + career + "/" + course + "/" + code + "/" + period)
        .then(async (response) => {
            return response.data;
        });
}

export function deleteSchedule(groupType, groupNumber, career, course, code, period) {
    return axios.post(url + 'deleteSchedule', {
        groupType: groupType,
        groupNumber: groupNumber,
        teachingGroup: {
            career: career,
            course: course,
            code: code,
            period: period
        }
    })
        .then(async (response) => {
            return response;
        });
}
