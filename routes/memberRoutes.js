const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const memberController = require("../controllers/memberController");

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("member"),
  memberController.memberDashboard
);

// Mark completed
router.post(
  "/complete/:id",
  authMiddleware,
  roleMiddleware("member"),
  memberController.markCompleted
);

module.exports = router;
