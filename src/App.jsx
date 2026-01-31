import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/create" element={ <ProtectedRoute>
      <CreateEvent /> </ProtectedRoute>
      
  }
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
