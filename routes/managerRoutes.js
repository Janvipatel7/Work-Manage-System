const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const managerController = require("../controllers/managerController");

// ---------------------
// Dashboard (Team members + manager-created works)
// ---------------------
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.managerDashboard
);

// ---------------------
// My Assigned Works (works assigned by Admin)
// ---------------------
router.get(
  "/work",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.myAssignedWorks
);

// ---------------------
// Create Work
// ---------------------
router.get(
  "/work/create",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.createWorkPage
);
router.post(
  "/work/create",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.createWork
);

// ---------------------
// Assign Work to Member
// ---------------------
router.get(
  "/work/assign/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.assignPage
);
router.post(
  "/work/assign/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.assignWork
);

// ---------------------
// Edit Work
// ---------------------
router.get(
  "/work/edit/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.editWorkPage
);
router.post(
  "/work/edit/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.editWork
);

// ---------------------
// Delete Work
// ---------------------
router.post(
  "/work/delete/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.deleteWork
);

// ---------------------
// Update Work Status (from My Works page)
// ---------------------
router.post(
  "/work/status/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.updateStatus
);

// ---------------------
// Completed Tasks
// ---------------------
router.get(
  "/completed",
  authMiddleware,
  roleMiddleware("manager"),
  managerController.completedTasks
);


module.exports = router;
