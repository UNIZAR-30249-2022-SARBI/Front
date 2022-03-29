import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Login from './pages/login.js';
import DataLoad from './pages/dataLoad.js';
import AdminMenu from './pages/adminMenu.js';
import CreateCalendar from './pages/createCalendar.js';

function App() {
	return (
	  <div class="App-header">
    <Router>
		<Routes>
			<Route path='/' exact={true} element={<Login/>} />
			  <Route path='/dataLoad' element={<DataLoad/>}/>
			  <Route path='/adminMenu' element={<AdminMenu/>}/>
			<Route path='/' exact={true} element={<Login />} />
			<Route path='/createCalendar' element={<CreateCalendar/>} />
		</Routes>
	</Router>
			</div>
  );
}

export default App;
