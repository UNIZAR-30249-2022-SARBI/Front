import { React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png';
import './login.css';
import { login } from '../api/user';
import axios from 'axios';
import { ReactSession } from 'react-client-session';

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '3vh',
	with: '20vh',
	height: '20vh'
};

const form = {
	display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
	marginTop: '10vh',
};

const inputContainer = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '10vh',
};

const button = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '10vh',
	borderRadius: '12px',
	marginLeft: '1vh',
};



const baseUrl= "http://localhost:8080"
const Login = () => {
	const [email, setEmail] = useState("");
	const history = useNavigate();
	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		await login( 'MICUZ')
			.then(response => {
				setEmail(response);
			});
	}

	async function handleClick(e) {
		// Gestionar comprobacion email, identificacion y redireccion
		e.preventDefault();
		let loginInfo = {
			email: email,
		}
		if(!validateEmail(email)){
			alert("El email no pertenece a la universidad de Zaragoza");
		}else{
			ReactSession.set("email", email);
			history("/adminMenu");
		}
	
	};

	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/.+@unizar.es/
		  );
	};

	return (
		<div style={form}>	
			<form>
				<div style={logo}>
					<img src={Logo} alt="Logo" />
				</div>
				<div style={inputContainer}>
					<input style={{height: '20px', width: '160px', marginLeft: '5px'}} type="email" placeholder="Correo electrónico" pattern=".+@unizar.es" required value={email} onChange={e => setEmail(e.target.value)} />
				</div>
				<div style={button}>
					<button onClick={(e) => handleClick(e)} style={{ backgroundColor: "#8BC34A", color: 'whitesmoke', borderRadius: '10px', height: '40px', width: '120px', fontSize:'15px' }}> Login </button>
				</div>
			</form>
		</div>
	);

};

export default Login;
