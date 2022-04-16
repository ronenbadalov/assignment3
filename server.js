require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use("/src", express.static("./src/"));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected To Database"));
app.use(express.json());

const sitesRouter = require("./routes/sites");
app.use("/sites", sitesRouter);

app.listen(3000, () =>
  console.log("Server Started on http://127.0.0.1:3000/sites")
);
