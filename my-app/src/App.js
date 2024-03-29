import React from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import LogIn from './LogIn';
import Regist from './Regist';
import Histo from './Histo';
import Edit from './Edit';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    {/* <div className='NavBgColor'>
      <Navbar/>
    </div> */}
      <Routes>
        <Route exact path='/LogIn' element={<LogIn />} />
        <Route exact path='/Regist' element={<Regist />} />
        <Route exact path='/Histo' element={<Histo />} />
        <Route exact path='/Edit' element={<Edit />} />
        <Route exact path='/' element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;