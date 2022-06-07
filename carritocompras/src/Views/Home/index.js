import { Component } from "react";
import "./styles.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      productos: [],
    };
  }

  componentDidMount() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:4000/getproductos", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.setState({
          productos: JSON.parse(result),
        });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div className="container">
        <h1>Página de Productos</h1>
        <div className="wrapper">
          {this.state.productos.map((producto) => {
            console.log(producto);
            return (
              <div>
                <h2>{producto.PRODUCTO}</h2>
                <img src={producto.IMAGEN} />
                <h4>{producto.DESCRIPCION}</h4>
                <button>Agregar al carrito</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
