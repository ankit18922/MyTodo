const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);


