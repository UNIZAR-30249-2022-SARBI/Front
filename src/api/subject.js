import axios from 'axios';

const url = 'http://localhost:3001/';

export function getSubjects(code, period) {
    return axios.get(url + 'listSubjectsByTeachingGroup/'+code+"/"+period)
        .then(async (response) => {
            return response.data;
        });
}

export function upload(file) {
    return axios.post(url + 'uploadSubjects/', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(async (response) => {
            console.log(response);
            return response;
        });
}
