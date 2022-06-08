import { Component, useEffect } from "react";

class Producto extends Component {
  constructor() {
    super();
    this.base64String = "";
    this.imageBase64Stringsep = "";
    this.state = {
      estados: [],
      categorias: [],
      SKU: "",
      producto: "",
      marca: "",
      descripcion: "",
      cantidadstock: 0,
      imagen: "",
      precio: 0.0,
      categoria: 0,
      estado: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    ////console.log(event.target.value);
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://localhost:4000/getestados", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        ////console.log(JSON.parse(result));
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

  async subirarchivo() {
    var file = document.querySelector("input[type=file]")["files"][0];
    let result = "";
    var reader = new FileReader();
    reader.onload = await function () {
      this.base64String = reader.result;
      this.imageBase64Stringsep = this.base64String;
      ////console.log(this.base64String);
    };
    reader.readAsDataURL(file);
    //console.log(this.base64String);
    this.setState({
      imagen: reader.result,
    });
  }

  handleSubmit(event) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sku: this.state.SKU,
      producto: this.state.producto,
      marca: this.state.marca,
      descripcion: this.state.descripcion,
      cantidad: this.state.cantidadstock,
      precio: this.state.precio,
      estado: this.state.estado,
      categoria: this.state.categoria,
      imagen: this.state.imagen,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/agregarproducto", requestOptions).then(
      (response) => response.text()
    );
  }

  render() {
    return (
      <div>
        <h2>Agregar producto</h2>
        <>
          <div>
            <div>
              <label>
                SKU producto:
                <input
                  type="text"
                  name="SKU"
                  autocomplete="off"
                  value={this.state.SKU}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Nombre Producto:
                <input
                  type="text"
                  name="producto"
                  autocomplete="off"
                  value={this.state.producto}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Marca Producto:
                <input
                  type="text"
                  name="marca"
                  autocomplete="off"
                  value={this.state.marca}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Descripcion:
                <input
                  type="text"
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Cantidad de ingreso:
                <input
                  type="number"
                  name="cantidadstock"
                  value={this.state.cantidadstock}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Precio:
                <input
                  type="number"
                  name="precio"
                  value={this.state.precio}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Estado:
                <select
                  name="estado"
                  value={this.state.estado}
                  onChange={this.handleInputChange}
                >
                  <option></option>
                  {this.state.estados.map((option) => {
                    ////console.log(option);
                    return (
                      <option key={option.ID_ESTADO} value={option.ID_ESTADO}>
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
                <select
                  name="categoria"
                  value={this.state.categoria}
                  onChange={this.handleInputChange}
                >
                  <option value=""></option>
                  {this.state.categorias.map((option) => {
                    return (
                      <option value={option.ID_CATEGORIA}>
                        {option.NOMBRE_CATEGORIA}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div>
              <label>
                Imagen:
                <input
                  type="text"
                  name="imagen"
                  value={this.state.imagen}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <button onClick={this.handleSubmit}>Guardar</button>
            </div>
          </div>
        </>
      </div>
    );
  }
}

export default Producto;
