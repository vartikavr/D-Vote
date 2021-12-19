require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
//to see server api(s) on the terminal, when accessed
const morgan = require("morgan");
// const path = require("path");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Constituency = require("./server/schemas/constituency");
const Party = require("./server/schemas/party");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const constituencyRoutes = require("./server/routes/constituency");
const voterRoutes = require("./server/routes/voter");
const partyRoutes = require("./server/routes/party");

app.use(morgan("tiny"));
app.use("/api/vote", constituencyRoutes); // for constituency routes
app.use("/api/voter", voterRoutes); // for voter routes
app.use("/api/party", partyRoutes); //for party routes

//global variables
global.startElection = false;
global.endElection = false;
global.winnerParty = null;

//uploading party logo to cloudinary
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

app.post("/api/upload", async (req, res) => {
  try {
    const file = req.files.files;
    await cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "DVote" },
      async (err, result) => {
        removeTmp(file.tempFilePath);
        //console.log(result)
        return res
          .status(200)
          .send({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

app.post("/api/start", (req, res) => {
  try {
    if (req.body.isAdmin) {
      startElection = true;
      return res.status(200).send({ success: "Election Started!" });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res
      .status(403)
      .send({ error: "An error occured in starting election" });
  }
});

app.post("/api/end", async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const constituencies = await Constituency.find({});
      let winningBar = constituencies.length / 2;
      let maxParty = "";
      let maxWins = 0;
      const parties = await Party.find({});
      for (let i = 0; i < parties.length; i++) {
        if (parties[i].constituenciesWon > maxWins) {
          maxWins = parties[i].constituenciesWon;
          maxParty = parties[i].name;
        }
      }
      if (maxWins > winningBar) {
        winnerParty = maxParty;
      }
      endElection = true;
      return res.status(200).send({ success: "Election ended successfully!" });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res
      .status(403)
      .send({ error: "An error occured in ending election" });
  }
});

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/DVote";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection; // to shorten
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

// app.use(express.static(path.join(__dirname, "client", "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving at port ${port}!`);
});
