import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Certifique-se de importar "Routes" em vez de "Route"
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<UserForm />} />
        <Route path="/lista" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
