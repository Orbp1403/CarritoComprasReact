import { Component, useEffect } from "react";

class Producto extends Component {
  constructor() {
    super();
    this.state = {
      estados: [],
      categorias: [],
      nombreproducto: "",
    };
  }

  componentDidMount() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/getestados", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.setState({
          estados: JSON.parse(result),
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

  render() {
    return (
      <div>
        <h2>Agregar producto</h2>
        <form>
          <div>
            <div>
              <label>
                SKU producto:
                <input type="text" name="nombre" autocomplete="off" />
              </label>
            </div>
            <div>
              <label>
                Nombre Producto:
                <input type="text" name="producto" />
              </label>
            </div>
            <div>
              <label>
                Marca Producto:
                <input type="text" name="marca" />
              </label>
            </div>
            <div>
              <label>
                Descripcion:
                <input type="text" name="descripcion" />
              </label>
            </div>
            <div>
              <label>
                Cantidad de ingreso:
                <input type="text" name="cantidad" />
              </label>
            </div>
            <div>
              <label>
                Precio:
                <input type="text" name="precio" />
              </label>
            </div>
            <div>
              <label>
                Estado:
                <select name="estado">
                  {this.state.estados.map((option) => {
                    console.log(option);
                    return (
                      <option key={option.ID_ESTADO} value="{option.ID_ESTADO}">
                        {option.NOMBRE_ESTADO}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Categoria:
                <select name="categoria">
                  {this.state.categorias.map((option) => {
                    return (
                      <option value="{option.ID_CATEGORIA}">
                        {option.NOMBRE_CATEGORIA}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Producto;
