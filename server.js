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
