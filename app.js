const express = require("express");
const qrcode = require("qrcode");
const ejs = require("ejs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const inputText = req.body.text;
  // console.log(inputText);

  qrcode.toDataURL(inputText, (error, src) => {
    if (error) res.send("Something went wrong");
    res.render("scan", {
      qr_code: src,
    });
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is listening at port number " + port);
});
