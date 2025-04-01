{/*
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App

*/}

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Login />
      </Router>
    </AuthProvider>
  );
}

export default App;

