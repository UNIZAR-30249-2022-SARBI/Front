import logo from './logo.svg';
import './App.css';
import { register } from './api/user';
import { useState, useEffect } from "react";

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
                 {name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
                  Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
