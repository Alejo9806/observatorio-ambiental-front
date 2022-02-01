import React from 'react';
import './App.css';
//componentes
import NavBar from './components/NavBar';

//react router
import {Routes} from './routes/Routes'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
