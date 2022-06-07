const { conn } = require("./configdb");

module.exports = {
  async selectestados() {
    const result = await conn.executeStoredProcedure("OBTENERESTADOSPRODUCTOS");
    return result.data[0];
  },
  async selectcategorias() {
    const result = await conn.executeStoredProcedure("OBTENERCATEGORIASPROD");
    return result.data[0];
  },
  async addproducto(
    SKU,
    PRODUCTO,
    MARCA,
    DESCRIPCION,
    CANTIDAD_STOCK,
    PRECIO,
    ID_ESTADO,
    ID_CATEGORIA,
    IMAGEN
  ) {
    const result = await conn.executeStoredProcedure(
      "INSERTARNPRODUCTO",
      null,
      {
        SKU: SKU,
        PRODUCTO: PRODUCTO,
        MARCA: MARCA,
        DESCRIPCION: DESCRIPCION,
        CANTIDAD_STOCK: CANTIDAD_STOCK,
        PRECIO: PRECIO,
        ID_ESTADO: ID_ESTADO,
        ID_CATEGORIA: ID_CATEGORIA,
        IMAGEN: IMAGEN,
      }
    );
    console.log(result);
  },
};
