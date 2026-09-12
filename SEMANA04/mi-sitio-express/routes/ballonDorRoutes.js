const express = require("express");
const router = express.Router();
const ballonDorController = require("../controllers/ballonDorController.js");

router.get("/balon-de-oro", ballonDorController.ballonDeOro);
router.post("/balon-de-oro", ballonDorController.votarBallonDeOro);

module.exports = router;
