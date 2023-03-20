import React, { useEffect } from 'react';
import { Route,Navigate,Routes } from 'react-router-dom';
import Home from './pages/Home'
import Search from './pages/Search';
function App() {
  
  return (
   <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element= {<Search/>} />
    </Routes>
  )
}

export default App
