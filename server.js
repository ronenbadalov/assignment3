require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

app.use(cors());

app.use("/src", express.static("./src/"));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected To Database"));
app.use(express.json());

const sitesRouter = require("./routes/sites");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use("/sites", sitesRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./404.html"));
});

app.listen(PORT, () =>
  console.log(`Server Started on http://127.0.0.1:${PORT}/`)
);
