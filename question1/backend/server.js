import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
