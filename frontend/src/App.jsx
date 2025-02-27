import { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Feedback from "./components/feedback/Feedback";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import UserLoginStore from "./contexts/UserLoginStore";
import Features from "./components/features/Features";



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
        }

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
