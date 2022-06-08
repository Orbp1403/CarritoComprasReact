import { Component } from "react";

import "./styles.css";

class Carrito extends Component {
  constructor() {
    super();
    console.log(localStorage.getItem("carrito"));
    if (localStorage.getItem("carrito") != null) {
      var productos = JSON.parse(localStorage.getItem("carrito"));
      var lproductos = [];
      var total = 0;
      for (var i = 0; i < productos.length; i++) {
        //console.log(productos[i]);
        var auxproducto = {
          SKU: productos[i].SKU,
          PRODUCTO: productos[i].PRODUCTO,
          MARCA: productos[i].MARCA,
          DESCRIPCION: productos[i].DESCRIPCION,
          PRECIO: parseFloat(productos[i].PRECIO),
          CANTIDAD: 1,
          STOCK: productos[i].CANTIDAD_STOCK,
        };
        lproductos.push(auxproducto);
        //console.log("total", typeof total);
        total += auxproducto.PRECIO;
        //console.log(total);
      }
      this.state = {
        carrito: lproductos,
        total: total,
      };
      this.total = total;
    } else {
      this.state = {
        carrito: [],
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  eliminarproducto(producto) {
    var lproductos = this.state.carrito.filter(
      (item) => item.SKU !== producto.SKU
    );
    console.log(lproductos);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(lproductos));
    this.forceUpdate();
    this.setState = {
        carrito : JSON.stringify(lproductos)
    }
    console.log(this.state);
  }

  limpiarcarrito() {
    localStorage.removeItem("carrito");
    this.setState = {
      carrito: [],
    };
    this.total = 0;
    this.forceUpdate();
  }

  callback(lproductos, total) {
    //console.log(this.state.total, total)
    this.setState = {
      carrito: lproductos,
      total: this.total,
    };
    //console.log(this.state.total)
    this.forceUpdate();
  }

  handleInputChange(event) {
    //console.log(event.target.value);
    var lproductos = this.state.carrito;
    var productosprocesados = 0;
    var total = 0;
    lproductos.forEach((producto) => {
      productosprocesados++;
      if (producto.SKU == event.target.name) {
        producto.CANTIDAD = event.target.value;
      }
      total += producto.CANTIDAD * producto.PRECIO;
      //console.log(total);
      if (productosprocesados == lproductos.length) {
        this.total = total;
        this.callback(lproductos, total);
      }
    });
  }

  render() {
    if (localStorage.getItem("carrito") != null) {
      return (
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>MARCA</th>
                <th>DESCRIPCION</th>
                <th>PRECIO</th>
                <th>CANTIDAD</th>
                <th>TOTAL</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            {this.state.carrito.map((producto) => {
              if (localStorage.getItem("carrito") != null) {
                return (
                  <tr>
                    <th>{producto.PRODUCTO}</th>
                    <th>{producto.MARCA}</th>
                    <th>{producto.DESCRIPCION}</th>
                    <th>Q {parseFloat(producto.PRECIO).toFixed(2)}</th>
                    <th>
                      <input
                        name={producto.SKU}
                        type="number"
                        value={producto.CANTIDAD}
                        onChange={this.handleInputChange}
                        min="1"
                        max={producto.STOCK}
                      />
                    </th>
                    <th>
                      Q{" "}
                      {(
                        parseFloat(producto.PRECIO).toFixed(2) *
                        parseFloat(producto.CANTIDAD).toFixed(2)
                      ).toFixed(2)}
                    </th>
                    <th>
                      <button onClick={() => {this.eliminarproducto(producto); this.forceUpdate()}}>
                        ELIMINAR
                      </button>
                    </th>
                  </tr>
                );
              } else {
                <h1>EL CARRITO ESTA VACIO :(</h1>;
              }
            })}
          </table>
          <div>
            <h2>TOTAL: Q {this.total.toFixed(2)}</h2>
            <button onClick={this.limpiarcarrito}>Limpiar carrito</button>
          </div>
        </div>
      );
    } else {
      return <h1>EL CARRITO ESTA VACIO :(</h1>;
    }
  }
}

export default Carrito;
