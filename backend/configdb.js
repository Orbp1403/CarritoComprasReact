const conn = new (require("rest-mssql-nodejs"))({
  user: "pruebasuvg",
  password: "pruebasuvg",
  server: "127.0.0.1",
  database: "PRUEBASUVG",
  port: 19791,
  options: {
    encrypt: true,
  },
});

module.exports = {
  conn,
};
