import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import UserLoginStore from './contexts/UserLoginStore';

createRoot(document.getElementById('root')).render(
  <UserLoginStore>
    <App />
  </UserLoginStore>
)
