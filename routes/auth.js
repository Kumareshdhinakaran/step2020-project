var express = require("express");
var router = express.Router();
var passport = require("passport");
var Book = require("../models/book");
var User = require("../models/user");
const book = require("../models/book");

// show register form
router.get("/register", function (req, res) {
  res.render("signuppage");
});

//handle sign up logic
router.post("/register", function (req, res) {
  var sampleBooks = [];
  var newUser = new User({
    username: req.body.username,
  });

  if (req.body.password === req.body.newpassword) {
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log("Error in registeration: ", err);
        req.flash("error", err.message);
        res.redirect("/register");
      }

      passport.authenticate("local")(req, res, function () {
        Book.find({}, function (err, books) {
          if (err) {
            console.log(err);
          } else {
            for (var i = 0; i < books.length; i++) {
              sampleBooks.push(books[i]);
            }
            req.user.books = req.user.books.concat(sampleBooks);
            req.user.save();
          }
        });
        req.flash("success", "Welcome to Book Attic " + user.username);
        res.redirect("/books");
      });
    });
  } else {
    req.flash("error", "Two passwords must be same");
    res.redirect("/register");
  }
});

//show login form
router.get("/", function (req, res) {
  res.render("loginpage");
});

//handling login logic
router.post(
  "/",
  passport.authenticate("local", {
    failureFlash: "You are not registered yet...",
    successRedirect: "/books",
    failureRedirect: "/",
  })
);

// logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/");
});

module.exports = router;
