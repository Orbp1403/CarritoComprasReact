const router = require("express").Router();
const sqlcontroller = require("./controller");

router.get("/", async (req, res) => {
  res.status(200).json({});
});

router.get("/getestados", async (req, res) => {
  try {
    data = await sqlcontroller.selectestados();
    //console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/getcategorias", async (req, res) => {
  try {
    data = await sqlcontroller.selectcategorias();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/getproductos", async (req, res) => {
  try {
      data = await sqlcontroller.selectproductos();
      res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/agregarproducto", async (req, res) => {
  try {
    console.log(req.body);
    data = await sqlcontroller.addproducto(
      req.body.sku,
      req.body.producto,
      req.body.marca,
      req.body.descripcion,
      req.body.cantidad,
      req.body.precio,
      req.body.estado,
      req.body.categoria,
      req.body.imagen
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
