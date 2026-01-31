import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <Toaster position="top-center" />
  </StrictMode>,
)
