import React from 'react';
import './App.scss';
import MonzoLogin from './components/MonzoLogin';
import OauthConfirmation from './components/OauthConfirmation';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={MonzoLogin} />
        <Route exact path="/oauth/callback" component={OauthConfirmation} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
