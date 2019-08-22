import React from 'react';
import './App.css';
import axios from 'axios'
import MonzoLogin from './components/MonzoLogin'

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
      <MonzoLogin />
    </div>
  );
}

export default App;
