var express = require("express"),
  app = express(),
  port = 5000;

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
//Home route
app.get("/", function (req, res) {
  res.render("loginpage");
});
app.get("/register", function (req, res) {
  res.render("signuppage");
});
app.get("/test", function (req, res) {
  res.render("partial/navheader");
});

//Server listening
app.listen(port, function () {
  console.log("Server Started successfully");
});
