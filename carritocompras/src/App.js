import logo from "./logo.svg";
import "./App.css";
import ProductosProvider from "./Context/Provider";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Views/Home";
import Producto from "./Views/Producto";

function App() {
  return (
    <ProductosProvider>
      <Router>
        <div>
          <nav>
            <ul id="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/agregarproducto">Agregar Producto</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/agregarproducto" element={<Producto />}></Route>
          </Routes>
        </div>
      </Router>
    </ProductosProvider>
  );
}

export default App;
