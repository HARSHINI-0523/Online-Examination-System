import { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import AboutUs from "./components/aboutus/AboutUs"; 
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Feedback from "./components/feedback/Feedback";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import UserLoginStore from "./contexts/UserLoginStore";
import Features from "./components/features/Features";
import Profile from "./components/profile/Profile"

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "aboutus", 
          element: <AboutUs />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "feedback",
          element: <Feedback />,
        },
        {
          path: "features",
          element: <Features />,
        },
        {
          path: "dashboard",
          element: <Dashboard />, // Keep Dashboard persistent
          children: [
            { path: "profile", element: <Profile /> },
            { path: "updateProfile", element: <UpdateProfile /> },
          ],
        },
        
      ],
    },
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
