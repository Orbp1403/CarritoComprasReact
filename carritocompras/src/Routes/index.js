import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../Views/Home";
import Producto from "../Views/Producto";


export default function Rutas() {
  return (
    <>
      <Router>
      
        <Routes>
        <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/agregarproducto" element={<Producto />}></Route>
        </Routes>
      </Router>
    </>
  );
}
