const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const adminController = require("../controllers/adminController");


router.get( "/dashboard", authMiddleware, roleMiddleware("admin"), adminController.dashboard);
router.post( "/user/delete/:id", authMiddleware, roleMiddleware("admin"), adminController.deleteUser);
router.get( "/work/create", authMiddleware, roleMiddleware("admin"), adminController.createWorkPage);
router.post( "/work/create", authMiddleware, roleMiddleware("admin"), adminController.createWork);
router.get( "/work/assign/:id", authMiddleware, roleMiddleware("admin"), adminController.assignWorkPage);
router.post( "/work/assign/:id", authMiddleware, roleMiddleware("admin"), adminController.assignWork);
router.get( "/work/view/:id", authMiddleware, roleMiddleware("admin"), adminController.viewWork);
router.get( "/work/edit/:id", authMiddleware, roleMiddleware("admin"), adminController.editWorkPage);
router.post( "/work/edit/:id", authMiddleware, roleMiddleware("admin"), adminController.updateWork);
router.post( "/work/delete/:id", authMiddleware, roleMiddleware("admin"), adminController.deleteWork);
router.get( "/assign-member", authMiddleware, roleMiddleware("admin"), adminController.assignMemberPage);
router.post( "/assign-member", authMiddleware, roleMiddleware("admin"), adminController.assignMember);
router.get( "/assigned-member/edit/:id", authMiddleware, roleMiddleware("admin"), adminController.editAssignedMemberPage);
router.post( "/assigned-member/edit/:id", authMiddleware, roleMiddleware("admin"), adminController.updateAssignedMember);
router.post( "/assigned-member/delete/:id", authMiddleware, roleMiddleware("admin"), adminController.deleteAssignedMember);

module.exports = router;
