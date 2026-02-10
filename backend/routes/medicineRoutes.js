const express = require("express");
const router = express.Router();
const { getMedicine } = require("../controllers/medicineController");

router.post("/recommend", getMedicine);

module.exports = router;