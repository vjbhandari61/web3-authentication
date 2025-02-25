const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/nonce", authController.generateNonce);
router.post("/authorize", authController.generateToken);

module.exports = router;