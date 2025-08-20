
const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

const {
  registerDevice,
  listDevices,
  updateDevice,
  deleteDevice,
  heartbeat,
} = require("../controllers/devices");

const { createLog, getLogs, getUsage } = require("../controllers/logs");

// Device Management
router.post("/", auth,registerDevice);    //auth middleware
router.get("/", auth, listDevices);
router.patch("/:id", auth, updateDevice);
router.delete("/:id", auth, deleteDevice);
router.post("/:id/heartbeat", auth, heartbeat);

// Data & Analytics
router.post("/:id/logs", auth, createLog);
router.get("/:id/logs", auth, getLogs);
router.get("/:id/usage", auth, getUsage);

module.exports = router;


