import axios from 'axios';

const url = 'http://localhost:3001/'; 

export function listRequest() {
    return axios.get(url +'listRequests/')
        .then(async (response) => {
            console.log("RESPON",response);
            return response.data;
        })
}

export function sendRequest(description, email, location) {
    return axios.post(url + 'sendRequest', {
        description: description,
        email: email,
        location: location
    })
        .then(async (response) => {
            return response;
        }) 
}

export function rejectRequest(requestId, comment) {
    return axios.post(url + 'rejectRequest', {
        requestId: requestId,
        comment: comment
    })
        .then(async (response) => {
            return response;
        });
}

export function acceptRequest(requestId, comment) {
    return axios.post(url + 'acceptRequest', {
        requestId: requestId,
        comment: comment
    })
        .then(async (response) => {
            return response;
        });
}