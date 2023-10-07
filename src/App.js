import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Space from './components/Space';
import Home from './components/Home';
import '@fontsource/roboto-mono';
import './App.scss';
import About from './components/About';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/model' element={<Space />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
