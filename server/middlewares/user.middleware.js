import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized, Token missing or invalid " });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData || !decodedData.id) {
      return res.status(403).json({
        message: "Forbidden, Token valid but without the necessary permissions",
      });
    }

    req.user = await User.findById(decodedData?.id);

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error, please Login !",
    });
  }
};

export default protectRoute;
