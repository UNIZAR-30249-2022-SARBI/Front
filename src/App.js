import logo from './logo.svg';
import './App.css';
import { register } from './api/user';
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Login from './pages/login.js';

function App() {
    const [name, setName] = useState(false)
    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        await register({ name: 'MICUZ' })
            .then(response => {
                setName(response);
            });
    }

  return (
    <Router>
		<Routes>
			<Route path='/' exact={true} element={<Login/>} />
		</Routes>
	</Router>
  );
}

export default App;
