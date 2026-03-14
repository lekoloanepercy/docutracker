const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metricsController");
const {requireAuth, requireRole} = require("../middleware/accessControl");

router.get("/",requireAuth, metricsController.getMetrics);

module.exports = router;
