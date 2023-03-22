import React, { useEffect } from 'react';
import { Route,Navigate,Routes  } from 'react-router-dom';
import Home from './pages/Home'
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Favourites from './pages/Favourites';
import Profile from './pages/Profile';
function App() {
  
  return (

   
   <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element= {<Search/>} />
        <Route path='/register' element= {<Register/>} />
        <Route path='/favorites' element= {<Favourites/>} />
        <Route path='/profile' element= {<Profile/>} />
        <Route path='/login' element= {<Login/>} />
    </Routes>
    

  )
}

export default App
