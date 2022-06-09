const conn = new (require("rest-mssql-nodejs"))({
  user: "pruebasuvg",
  password: "pruebasuvg",
  server: "192.168.1.9",
  database: "PRUEBASUVG",
  port: 19791,
  options: {
    encrypt: true,
  },
});

module.exports = {
  conn,
};
