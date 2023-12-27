import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import Login from './components/Login';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleLogin = () => {
    // You might have additional logic here to determine if login is successful
    // For now, we're setting isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // You might have logout logic here
    // For now, we're setting isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/student-list" /> : <Login onLogin={handleLogin} />}
            />

          <Route
            path="/student-list"
            element={isLoggedIn ? <StudentList onLogout={handleLogout}/> : <Navigate to="/" />}
          />
          
          <Route
            path="/add-student"
            element={isLoggedIn ? <AddStudentForm /> : <Navigate to="/" />}
          />

          <Route 
            path="/edit-student/:id" 
            element={<AddStudentForm editMode />} 
          />

      </Routes>
  </Router>
  );
};

export default App;
