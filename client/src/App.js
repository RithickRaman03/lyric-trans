import React from 'react';
import Adduser from './Pages/adduser';
import Dashboard from './Pages/dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const App=()=>{

  return (
    <div className="container">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Adduser/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );  
};

export default App;