import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from '../assets/Logo.jpeg';
import './login.css';

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '3vh',
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
};

function handleClick(e) {
	// Gestionar comprobacion email, identificacion y redireccion

};

const Login = () => {


	return (
		<div style={form}>	
			<form>
				<div style={logo}>
					<img src={Logo} alt="Logo" />
				</div>
				<div style={inputContainer}>
					<label style={{marginRight:'10px'}}> Correo: </label>
					<input style={{borderRadius:'5px'}} type="mail" name="email" required/>
				</div>
				<div style={button}>
					<button onClick={(e) => handleClick(e)} style={{borderRadius:'5px', fontSize: '20px', border: '2px solid Red'}}> Acceder </button>
				</div>
			</form>
		</div>
	);

};

export default Login;
