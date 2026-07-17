import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.models.js";
import { title } from "process";
import { error, log } from "console";
import AuthBcryptRouter from "../routes/AuthBcrypt.route.js";
import transporter from "../config/mail.config.js";

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

// Forget Password Page
export const forgotPasswordPage = (req, res) => {
  res.render("AuthBcrypt/forgotPassword", {
    title: "Forgot Password",

    success: null,

    error: null,
  });
};

// Forget Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //Find User by Email-----------------------------------
    const user = await User.findOne({ email });

    //User Not Found---------------------------------------
    if (!user) {
      return res.render("AuthBcrypt/forgotPassword", {
        title: "Forgot Password",
        success: null,
        error: "No account found with this email.",
      });
    }
    //Generate Secure Token---------------------------------
    const resetToken = crypto.randomBytes(32).toString("hex");

    //Token Expiry-----------------------------------------
    const tokenExpiry = Date.now() + 50 * 60 * 1000;

    //Save Token-------------------------------------------
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      html: ` <h2>Password Reset</h2>

        <p>Hello ${user.name},</p>

        <p>Click the button below to reset your password.</p>

        <a
            href="${resetLink}"
            style="
                display:inline-block;
                padding:12px 20px;
                background:#0d6efd;
                color:#fff;
                text-decoration:none;
                border-radius:6px;
            "
        >
            Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        <p>If you didn't request this, please ignore this email.</p>`,
    });

    console.log(resetToken);
    console.log(new Date(tokenExpiry));

    return res.render("AuthBcrypt/forgotPassword", {
      title: "Forgot Password",

      // success:"Reset token generated successfully. (Email sending comes in next part.)",
      success: "Password reset link has been sent to your email.",
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.render("AuthBcrypt/forgotPassword", {
      title: "Forgot Password",

      success: null,

      error: "Something went wrong.",
    });
  }
};

// Reset Password Page

export const resetPasswordPage = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Token:", token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.send("Invalid or Expired Reset Link");
    }
    res.render("AuthBcrypt/resetPassword", {
      title: "Reset Password",
      token,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.send("Something wend Wrong");
  }
};

// Reset Password

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    //Check Password Match
    if (password !== confirmPassword) {
      return res.render("AuthBcrypt/resetPassword", {
        title: "Reset Password",
        token,
        error: "Password Do not match",
      });
    }
    // Find User
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.send("Invalid or Expired Reset Link");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Update Password
    user.password = hashedPassword;
    // Remove resent token

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.redirect("/AuthLogin");
  } catch (error) {
    console.log(error);
    res.send("Something Wend Wrong");
  }
};
