import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./server/database/user.db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//APP

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

//ROUTES USER
import UserRoute from "./server/routers/user.route.js";

app.use("/api/user", UserRoute);

//LISTENER APP

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
