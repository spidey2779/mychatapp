import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import { connectDB } from "./utils/features.js";
dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use('/admin',adminRoute)
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
