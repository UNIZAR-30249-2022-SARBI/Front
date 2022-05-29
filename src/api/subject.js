import axios from 'axios';

const url = 'http://localhost:3001/';

export function getSubjects() {
    return axios.get(url + 'listAllSubjects')
        .then(async (response) => {
            return response.data;
        });
}
