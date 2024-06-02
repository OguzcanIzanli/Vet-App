import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Customer from "./pages/Customer";
import Animal from "./pages/Animal";
import Doctor from "./pages/Doctor";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/customer" element={<Customer />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </>
  );
}

export default App;
