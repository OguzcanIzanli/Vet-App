import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Customer from "./pages/Customer";
import Animal from "./pages/Animal";
import Doctor from "./pages/Doctor";
import Appoinment from "./pages/Appointment";
import Report from "./pages/Report";
import Vaccine from "./pages/Vaccine";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/appointment" element={<Appoinment />} />
          <Route path="/report" element={<Report />} />
          <Route path="/vaccine" element={<Vaccine />} />

          <Route path="/customer" element={<Customer />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
