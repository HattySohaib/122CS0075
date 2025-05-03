const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
