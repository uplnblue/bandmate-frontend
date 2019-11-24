import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Listen from './views/listen';


function App() {
  return (
    <div className="App">
      <Header />
        <div className="container">
          <Switch>
              <Route exact path='/about' render={()=><h1>BandMate</h1>} />
              <Route exact path='/listen' render={()=><Listen />} />
              <Route exact path='/analytics' render={() => <h1>Analytics</h1>} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
