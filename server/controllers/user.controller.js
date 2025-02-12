import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { generateResetToken } from "../utils/generateResetToken.js";
import { sendEmail } from "../utils/SendEmail.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exist !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    generateToken(user?._id, res);

    res.status(201).json({
      user,
      message: "User created✌️",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User don't find, please register!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user?.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Incorrect password, try again" });
    }

    generateToken(user?._id, res);

    return res.status(200).json({
      user,
      message: "Welcome",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const myProfile = async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout successfully! 👋" });
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User don't find !" });
    }

    const resetToken = generateResetToken(user._id);
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Reset Password",
      `Clicca qui per resettare la password: ${resetLink}`
    );

    res.status(200).json({ message: "Recovery email sent! 📩" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, retry!" });
  }
};
export const resetPasswordDinamic = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required." });
  }

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorized, Token missing or invalid" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    res.status(200).json({ message: "Password updated successfully! ✅" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
