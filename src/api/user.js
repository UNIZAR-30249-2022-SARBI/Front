import axios from 'axios';

const url = 'http://localhost:3001/'; 

export function login(email) {
    return axios.post(url+'login', {
        email: email,
    })
        .then(async (response) => {
            console.log(response.data);
            return response.data.email;
        })
}