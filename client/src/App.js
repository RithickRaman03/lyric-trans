import React from 'react';
import Adduser from './Pages/adduser';
import Dashboard from './Pages/dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import UserDetails from './Pages/userDetails';
const App=()=>{

  return (
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Adduser/>}/>
      <Route path='/userdetails' element= {<UserDetails/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
     </BrowserRouter>
  );  
};

export default App;