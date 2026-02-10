const express = require("express");

const router = express.Router();

const lifestyleController = require("../controllers/lifestyleController");

router.post("/", lifestyleController.lifestyle);

module.exports = router;