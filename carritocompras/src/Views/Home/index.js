import { Component } from "react";
import "./styles.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      categorias: [],
      categoria: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:4000/getproductos", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //console.log(JSON.parse(result));
        this.setState({
          productos: JSON.parse(result),
        });
      })
      .catch((error) => console.log("error", error));
    fetch("http://localhost:4000/getcategorias", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          categorias: JSON.parse(result),
        });
      })
      .catch((error) => console.log("error", error));
  }

  handleInputChange(event) {
    const value = event.target.value;
    //console.log(event.target.value);
    const name = event.target.name;
    this.setState({
      categoria: value,
    });
  }

  agregarcarrito(producto) {
    if (localStorage.getItem("carrito") == null) {
      carrito = [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      var carrito = JSON.parse(localStorage.getItem("carrito"));
      //console.log(producto);
      //console.log("carrito", carrito[0]);
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }

  render() {
    const categoria = this.state.categoria;
    return (
      <div className="container">
        <h1>Página de Productos</h1>
        <label>
          Buscar:
          <select
            value={this.state.categoria}
            onChange={this.handleInputChange}
          >
            <option value="0">Todas las categorias</option>
            {this.state.categorias.map((categoria) => {
              return (
                <option value={categoria.ID_CATEGORIA}>
                  {categoria.NOMBRE_CATEGORIA}
                </option>
              );
            })}
          </select>
        </label>
        <div className="wrapper">
          {this.state.productos.map((producto) => {
            //console.log(producto);
            return categoria == 0 ? (
              <div>
                <h2>{producto.PRODUCTO}</h2>
                <img src={producto.IMAGEN} />
                <h4>{producto.DESCRIPCION}</h4>
                <h5>Q {parseFloat(producto.PRECIO).toFixed(2)}</h5>
                <button onClick={() => this.agregarcarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            ) : producto.ID_CATEGORIA == categoria ? (
              <div>
                <h2>{producto.PRODUCTO}</h2>
                <img src={producto.IMAGEN} />
                <h4>{producto.DESCRIPCION}</h4>
                <h5>Q {parseFloat(producto.PRECIO).toFixed(2)}</h5>
                <button onClick={() => this.agregarcarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
