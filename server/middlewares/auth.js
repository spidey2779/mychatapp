import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["chat-token"];
  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userId._id;
  next();
};
export default isAuthenticated;
