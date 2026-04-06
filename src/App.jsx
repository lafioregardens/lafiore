import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BirthMonthFlowers from "./pages/BirthMonthFlowers";
import Cart from "./pages/Cart";
import Toast from "./components/Toast";
import CustomizeBouquet from "./pages/CustomizeBouquet";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PlantFinder from "./pages/PlantFinder";
import Consultation from './pages/Consultation';
import Shop from "./pages/Shop";
function App() {
  return (
    <>
    <Toast />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/birth-month" element={<BirthMonthFlowers />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/customize" element={<CustomizeBouquet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/plantfinder" element={<PlantFinder />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
    </>
  )
}

export default App