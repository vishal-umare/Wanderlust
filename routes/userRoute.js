const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/userController.js")

// SIGNUP ROUTES
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signupRoute));

// LOGIN ROUTES
router.get("/login", userController.renderLoginForm)

router.post("/login" , saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}) , userController.loginRoute)

// LOGOUT ROUTES
router.get("/logout", userController.logoutRoute)

module.exports = router;        