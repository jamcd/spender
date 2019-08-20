import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function Test() {
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    axios.get('/ping')
    .then(response => {
      setText(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <p>{text || 'Loading...'}</p>
  )
}

function App() {
  return (
    <div className="App">
      <Test />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
