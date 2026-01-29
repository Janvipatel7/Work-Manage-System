const User = require("../models/User");
const Work = require("../models/Work");

// Dashboard: show team members + works created by this manager
const managerDashboard = async (req, res) => {
  try {
    // Team members under this manager
    const teamMembers = await User.find({ role: "member", teamId: req.user._id });

    // Works created by this manager
    const works = await Work.find({ createdBy: req.user._id })
      .populate({ path: "assignedToMember", strictPopulate: false });

    res.render("manager/dashboard", { teamMembers, works });
  } catch (error) {
    console.error(error);
    res.send("Error in managerDashboard");
  }
};

// My Works: works assigned to this manager by admin
const myAssignedWorks = async (req, res) => {
  try {
    const works = await Work.find({ assignedToManager: req.user._id })
      .populate({ path: "createdBy", strictPopulate: false }); // who created (admin/manager)

    res.render("manager/managerWork", { works });
  } catch (error) {
    console.error(error);
    res.send("Error in myAssignedWorks");
  }
};

// Create Work Page
const createWorkPage = (req, res) => {
  res.render("manager/createWork");
};

// Create Work Logic
const createWork = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Work.create({
      title,
      description,
      createdBy: req.user._id,
      status: "pending",
    });

    res.redirect("/manager/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error in createWork");
  }
};

// Assign Work to member Page
const assignPage = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.redirect("/manager/dashboard");

    // Get all members of this manager
    const members = await User.find({ role: "member", teamId: req.user._id });

    res.render("manager/assign", { work, members });
  } catch (error) {
    console.error(error);
    res.send("Error in assignPage");
  }
};

// Assign Work Logic
const assignWork = async (req, res) => {
  try {
    const { memberId } = req.body;
    const workId = req.params.id;

    // ✅ Only assign if work belongs to this manager AND is NOT completed
    await Work.findOneAndUpdate(
      {
        _id: workId,
        createdBy: req.user._id,        // manager owns this work
        status: { $ne: "completed" },   // cannot reassign completed work
      },
      {
        assignedToMember: memberId,
        status: "assigned",
      }
    );

    res.redirect("/manager/dashboard");
  } catch (error) {
    console.error("Assign Work Error:", error);
    res.redirect("/manager/dashboard");
  }
};


// Edit Work Page
const editWorkPage = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.redirect("/manager/dashboard");

    res.render("manager/editWork", { work });
  } catch (error) {
    console.error(error);
    res.send("Error in editWorkPage");
  }
};

// Edit Work Logic
const editWork = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Work.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect("/manager/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error in editWork");
  }
};

// Delete Work
const deleteWork = async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.redirect("/manager/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error in deleteWork");
  }
};

// Update Work Status (from My Works page)
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Work.findByIdAndUpdate(req.params.id, { status });
    res.redirect("/manager/work");
  } catch (error) {
    console.error(error);
    res.send("Error in updateStatus");
  }
};

// =======================
// Get all completed tasks (for manager dashboard)
// =======================
const completedTasks = async (req, res) => {
  try {
    const tasks = await Work.find({
      createdBy: req.user._id,  // manager who created the task
      status: "completed"        // make sure exactly "completed"
    }).populate("assignedToMember", "name email");

    console.log(tasks); // DEBUG: Check if tasks are returned
    res.render("manager/completedTasks", { tasks });
  } catch (error) {
    console.log("Completed Tasks Error:", error);
    res.redirect("/manager/dashboard");
  }
};
// Export all functions
module.exports = {
  managerDashboard,
  myAssignedWorks,
  createWorkPage,
  createWork,
  assignPage,
  assignWork,
  editWorkPage,
  editWork,
  deleteWork,
  updateStatus,
  completedTasks,
};
