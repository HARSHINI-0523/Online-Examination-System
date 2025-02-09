import { useState,useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateProfile from "./components/updateProfile/UpdateProfile";

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const PrivateLayout = () => (
  <PrivateRoute>
    <Outlet />
  </PrivateRoute>
  );

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
