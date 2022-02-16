import axios from 'axios';

const url = 'http://localhost:3002/'; 

export function register(newUser) {
    return axios.post(url+'Register', {
        name: newUser.name,
    })
        .then(async (response) => {
            console.log(response.data);
            return response.data.name;
        })
}