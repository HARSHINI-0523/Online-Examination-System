import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/home/Home";

const PublicLayout = () => (
    <>
        <Outlet />
    </>
);

function App() {
  
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout/>}>
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
     
  )
}

export default App
