import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Listen from './views/listen';


function App() {
  require('dotenv').config();
  return (
    <div className="App">
      <Header />
        <div className="container">
          <Switch>
              <Route exact path='/' render={()=><Listen />} />
              <Route exact path='/listen' render={()=><Listen />} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
