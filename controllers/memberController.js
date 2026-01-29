const Work = require("../models/Work");

// =======================
// MEMBER DASHBOARD
// =======================
const memberDashboard = async (req, res) => {
  try {
    const works = await Work.find({
      assignedToMember: req.user._id,   // ✅ FIXED
    }).populate("assignedToManager", "name");

    res.render("member/dashboard", { works });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

// =======================
// MARK WORK AS COMPLETED
// =======================
const markCompleted = async (req, res) => {
  try {
    await Work.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedToMember: req.user._id,   // ✅ FIXED
      },
      {
        status: "completed",
      }
    );

    res.redirect("/member/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/member/dashboard");
  }
};

module.exports = {
  memberDashboard,
  markCompleted,
};
