import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/VapiWidget";
import PrivateRoute from "./components/PrivateRoute";
import Vaccination from "./pages/Vaccination";
import Navbar from "./components/Navbar";
import LocationHealth from "./pages/LocationHealth";
import FirstAid from "./pages/FirstAid";
import SOS from "./pages/SOS";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import Diet from "./pages/Diet";
import AddDiet from "./pages/AddDiet";
import VapiWidget from "./pages/VapiWidget";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        <Route path="/vaccination" element={<Vaccination />} />
        <Route path="/location-health" element={<LocationHealth />} />
        <Route path="/first-aid" element={<FirstAid />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/add-diet" element={<AddDiet />} />
        <Route path="/vapiWidget" element={<VapiWidget/>}/>

      </Routes>
    </>
  );
}

export default App;