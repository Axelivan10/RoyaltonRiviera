import React, { useEffect, useState } from 'react';
import './App.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import ProtectedPrivateRoutes from './routes/protectedPrivateRoutes';
import Email from './components/login.components/email';
import ProtectedEmail from './routes/protectedEmail';
import Admin from './pages/admin';
import Manning from './pages/manning';
import ParameterValue from './components/manning.components/parameterValue';
import RatiosCriteria from './components/manning.components/ratiosCriteria';


function App() {
  return(

    <Router>
    <Routes>

      <Route path="/" element={<Login />} />

      <Route element={<ProtectedEmail/>}>
      <Route path="/email" element={<Email/>} />
      </Route>

      <Route element={<ProtectedPrivateRoutes/>}>
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="/admin" element={<Admin /> } />
          <Route path="/manning" element={<Manning enviarDatoAlPadre={(data) => console.log()}/> } />           
          <Route path="/parameter" element={<ParameterValue/> } />   
          <Route path="/ratios" element={<RatiosCriteria/> } />                   
      </Route>

      <Route path="/*" element={"NOT FOUND"} />

    </Routes>
  </Router>
  )
}

 
export default App
