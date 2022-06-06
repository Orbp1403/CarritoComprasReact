const router = require("express").Router();
const sqlcontroller = require("./controller");

router.get("/", async (req, res) => {
  res.status(200).json({});
});

router.get("/getestados", async (req, res) => {
  try {
    data = await sqlcontroller.selectestados();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
