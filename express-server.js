const path = require("path");
const express = require("express");

process.env.NODE_ENV = "production";
const port = process.env.PORT || 8090;

const app = express();
app.use("/build", express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log("Listening on port " + port);
