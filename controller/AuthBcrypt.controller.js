import bcrypt from "bcrypt";
import User from "../models/user.models.js";

// Register Page
export const registerPage = (req, res) => {
  res.render("AuthBcrypt/register", {
    title: "Register",
  });
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("Email Already Registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,

      email,

      password: hashedPassword,
    });

    await user.save();

    // res.send("Registration Successful");

    res.redirect("/AuthLogin");
  } catch (error) {
    console.error(error);

    res.status(500).send("Internal Server Error");
  }
};

// Login Page

export const loginPage = (req, res) => {
  res.render("AuthBcrypt/login", {
    title: "Login",
  });
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User Not Found");
    }

    const isMatch = await bcrypt.compare(
      password,

      user.password,
    );

    if (!isMatch) {
      return res.send("Invalid Password");
    }

    req.session.user = {
      id: user._id,

      name: user.name,

      email: user.email,
    };

    res.redirect("/AuthDashBoard");
  } catch (error) {
    console.error(error);

    res.status(500).send("Internal Server Error");
  }
};

// DashBoard
export const dashboardPage = (req, res) => {
  res.render("AuthBcrypt/dashboard", {
    title: "Dashboard",
    user: req.session.user,
  });
};

// Logout
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Logout Failed");
    }

    res.redirect("/AuthLogin");
  });
};

// Profile Page
export const profilePage = (req, res) => {
  res.render("AuthBcrypt/profile", {
    title: "Profile",

    user: req.session.user,
  });
};

// Edit Profile
export const editProfilePage = (req, res) => {
  res.render("AuthBcrypt/edit-profile", {
    title: "Edit Profile",

    user: req.session.user,

    success: null,

    error: null,
  });
};

//Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    await User.findByIdAndUpdate(
      req.session.user.id,

      {
        name,
        email,
      },
    );

    // Update session data
    req.session.user.name = name;
    req.session.user.email = email;

    res.redirect("/AuthProfile");
  } catch (error) {
    console.log(error);

    res.redirect("/AuthEdit-profile");
  }
};
