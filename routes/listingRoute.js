const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listingController.js");

const multer  = require('multer');
// const { storage } = require("../cloudConfig.js");
const upload = multer({ dest: "uploads/" });

// Index Route
router.get("/",  wrapAsync(listingController.indexRoute));

// New Route
router.get("/new", isLoggedIn, listingController.newRoute);

// Show Route
router.get("/:id",  wrapAsync(listingController.showRoute));  

// Create Route
router.post("/",  isLoggedIn, validateListing, upload.single("listing[image]"),  wrapAsync(listingController.createRoute));

// Edit Route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editRoute));

// Update Route
router.put("/:id" , isLoggedIn, isOwner,upload.single("listing[image]"), validateListing,  wrapAsync(listingController.updateRoute));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute));


module.exports = router;