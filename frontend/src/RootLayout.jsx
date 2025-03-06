import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import { Outlet } from "react-router-dom";
import { userLoginContext } from "./contexts/userLoginContext";
import { useState, useEffect } from "react";
import { useContext } from "react";

function RootLayout() {
  const {userLoginStatus}= useContext(userLoginContext);
  return (
    <div>
      <Header />
      <Outlet />
      {userLoginStatus == true ? <Dashboard /> : <Dashboard />}
      {/* {userLoginStatus && <Dashboard />} */}
      <Footer />
    </div>
  );
}

export default RootLayout;
