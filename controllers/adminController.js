const User = require("../models/User");
const Work = require("../models/Work");

// =======================
// ADMIN DASHBOARD
// =======================
const dashboard = async (req, res) => {
  try {
    const users = await User.find();

    // ✅ ONLY ADMIN-CREATED WORKS
    const works = await Work.find({
      createdBy: req.user._id, // 🔥 FIX
    }).populate("assignedToManager", "name");

    // ✅ FETCH assigned members with their manager
    const assignedMembers = await User.find({
      role: "member",
      teamId: { $ne: null },
    }).populate("teamId", "name");

    res.render("admin/dashboard", {
      users,
      works,
      assignedMembers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

// =======================
// DELETE USER
// =======================
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// CREATE WORK PAGE
// =======================
const createWorkPage = (req, res) => {
  res.render("admin/createWork");
};

// =======================
// CREATE WORK
// =======================
const createWork = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Work.create({
      title,
      description,
      status: "pending",
      createdBy: req.user._id, // 🔥 FIX (MOST IMPORTANT)
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// ASSIGN WORK PAGE
// =======================
const assignWorkPage = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    const managers = await User.find({ role: "manager" });

    res.render("admin/assignWork", { work, managers });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// ASSIGN WORK TO MANAGER
// =======================
const assignWork = async (req, res) => {
  try {
    const { managerId } = req.body;

    await Work.findByIdAndUpdate(req.params.id, {
      assignedToManager: managerId,
      status: "assigned",
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// DELETE WORK
// =======================
const deleteWork = async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// VIEW WORK DETAILS
// =======================
const viewWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id)
      .populate("assignedToManager", "name");

    res.render("admin/viewWork", { work });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// EDIT WORK PAGE
// =======================
const editWorkPage = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    res.render("admin/editWork", { work });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// UPDATE WORK
// =======================
const updateWork = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Work.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// ASSIGN MEMBER PAGE
// =======================
const assignMemberPage = async (req, res) => {
  const managers = await User.find({ role: "manager" });
  const members = await User.find({ role: "member" });

  res.render("admin/assignMember", { managers, members });
};

// =======================
// ASSIGN MEMBER ACTION
// =======================
const assignMember = async (req, res) => {
  const { managerId, memberId } = req.body;

  await User.findByIdAndUpdate(memberId, { teamId: managerId });
  res.redirect("/admin/dashboard");
};

// =======================
// EDIT ASSIGNED MEMBER PAGE
// =======================
const editAssignedMemberPage = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    const managers = await User.find({ role: "manager" });

    res.render("admin/editAssignedMember", { member, managers });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// UPDATE ASSIGNED MEMBER
// =======================
const updateAssignedMember = async (req, res) => {
  try {
    const { managerId } = req.body;
    await User.findByIdAndUpdate(req.params.id, { teamId: managerId });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

// =======================
// DELETE ASSIGNED MEMBER
// =======================
const deleteAssignedMember = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { teamId: null });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/dashboard");
  }
};

module.exports = {
  dashboard,
  deleteUser,
  createWorkPage,
  createWork,
  assignWorkPage,
  assignWork,
  deleteWork,
  viewWork,
  editWorkPage,
  updateWork,
  assignMemberPage,
  assignMember,
  deleteAssignedMember,
  editAssignedMemberPage,
  updateAssignedMember,
};
