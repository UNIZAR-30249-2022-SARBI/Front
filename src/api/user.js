import axios from 'axios';

const url = 'https://localhost:8080'; 

export function register(newUser) {
    return axios.post(url+'Register', {
        email: newUser.Mail,
        nombreUsuario: newUser.Username,
        contrasena: newUser.Password,
    })
        .then(async (response) => {
            console.log(response.data);
            return response.data;
        })
}