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
import CreateSchedule from './pages/createSchedule.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<Login/>} />
        <Route path='/dataLoad' element={<DataLoad/>}/>
        <Route path='/adminMenu' element={<AdminMenu/>}/>
        <Route path='/createSchedule' element={<CreateSchedule/>}/>
      </Routes>
  	</Router>
  );
}

export default App;
