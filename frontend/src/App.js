import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import LoginPage from './authPages/loginPage/LoginPage';
import RegisterPage from './authPages/registerPage/RegisterPage';
import AlertNotification from "./shared/components/AlertNotification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <AlertNotification />
    </>
  );
}

export default App;
