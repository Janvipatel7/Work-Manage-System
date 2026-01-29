const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= PAGE CONTROLLERS =================

// Register Page
const registerPage = (req, res) => {
  res.render("auth/register");
};

// Login Page
const loginPage = (req, res) => {
  res.render("auth/login");
};

// ================= ACTION CONTROLLERS =================

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, teamId } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.redirect("/auth/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      teamId: teamId || null,
    });

    return res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/register");
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/auth/login");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ROLE BASED REDIRECT
    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    if (user.role === "manager") {
      return res.redirect("/manager/dashboard");
    }
    return res.redirect("/member/dashboard");
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/login");
  }
};

// LOGOUT
const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth/login");
};

module.exports = {
  registerPage,
  loginPage,
  registerUser,
  loginUser,
  logoutUser,
};
