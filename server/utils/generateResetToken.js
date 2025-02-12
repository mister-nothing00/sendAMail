import jwt from "jsonwebtoken";

export const generateResetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
