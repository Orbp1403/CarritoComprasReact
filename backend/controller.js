const { conn } = require("./configdb")

module.exports = {
    async selectestados() {
        const result = await conn.executeStoredProcedure("OBTENERESTADOSPRODUCTOS")
        return result;
    }
}