const express = require("express");
const router = express.Router();
const f02Controller = require("../controllers/f02");

// GET disability categories
router.get("/disability-types", f02Controller.getDisabilityTypes);

// POST selected disability
router.post("/disability", f02Controller.saveDisability);

module.exports = router;