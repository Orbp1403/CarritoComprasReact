import { Component } from "react";

import "./styles.css";

class Carrito extends Component {
  constructor() {
    super();
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

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  

  callback(lproductos, total) {
      //console.log(this.state.total, total)
    this.setState = {
      carrito: lproductos,
      total : this.total
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
            </tr>
          </thead>
          {this.state.carrito.map((producto) => {
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
              </tr>
            );
          })}
        </table>
        <div>
          <h2>TOTAL: Q {this.total.toFixed(2)}</h2>
        </div>
      </div>
    );
  }
}

export default Carrito;
