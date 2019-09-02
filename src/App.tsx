import React from 'react';
import './App.css';
import MonzoLogin from './components/MonzoLogin';
import OauthConfirmation from './components/OauthConfirmation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={MonzoLogin} />
        <Route exact path="/oauth/callback" component={OauthConfirmation} />
      </div>
    </Router>
  );
};

export default App;
