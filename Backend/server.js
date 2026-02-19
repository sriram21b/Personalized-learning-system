const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Root route hit")
  res.send("Backend running 🚀");
});

app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});