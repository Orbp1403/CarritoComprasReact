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
};
