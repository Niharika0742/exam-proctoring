import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Assignment from './assignment';
import Login from './login';
import Register from './register';
import AdminLogin from './adminlogin';
const App = () => {
   
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/adminlogin" element={<AdminLogin/>}/>
        </Routes>
      </Router>
    )
}

export default App