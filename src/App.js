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
import ModifyCalendar from './pages/modifyCalendar.js';
import CreateSchedule from './pages/createSchedule.js';
import UserMenu from './pages/userMenu.js';
import RequestList from './pages/requestList.js';
import UserCalendar from './pages/userCalendar';
import UserSchedule from './pages/userSchedule';

function App() {
	return (
		<div class="App-header">
    <Router>
		<Routes>
			<Route path='/' exact={true} element={<Login/>} />
			<Route path='/dataLoad' element={<DataLoad/>}/>
			<Route path='/adminMenu' element={<AdminMenu/>}/>
			<Route path='/' exact={true} element={<Login />} />
			<Route path='/createCalendar' element={<CreateCalendar />} />
			<Route path='/modifyCalendar/:course/:version' element={<ModifyCalendar />} />
			<Route path='/createSchedule' element={<CreateSchedule />} />
			<Route path='/userMenu' element={<UserMenu />} />
			<Route path='/requestList' element={<RequestList />} />
			<Route path='/userCalendar' element={<UserCalendar />} />
			<Route path='/userSchedule' element={<UserSchedule />} />

		</Routes>
	</Router>
			</div>
  );
}

export default App;
