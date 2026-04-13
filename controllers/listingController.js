const Listing = require("../models/listing.js");
const cloudinary = require("../cloudConfig");
const fs = require("fs");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN ;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// INDEX ROUTE
module.exports.indexRoute = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// NEW ROUTE
module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW ROUTE
module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createRoute = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location ,
    limit: 1
  })
  .send()

  // 🔥 Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "wanderlust_dev",
  });

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // ✅ Save Cloudinary image URL
  newListing.image = {
    url: result.secure_url,
    filename: result.public_id,
  };

  newListing.geometry = response.body.features[0].geometry ;

  let saved = await newListing.save();
  console.log(saved);
  // 🧹 Delete temp file
  fs.unlinkSync(req.file.path);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// EDIT ROUTE
module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150,h_100,c_fill");
  res.render("listings/edit.ejs", { listing , originalImageUrl});
};

// UPDATE ROUTE
module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;

  // 🔹 Find existing listing 
  let listing = await Listing.findById(id);

  // 🔹 Update text fields
  Object.assign(listing, req.body.listing);

  // 🔥 If user uploaded new image
  if (req.file) {
    // 🧹 Delete old image from Cloudinary
    await cloudinary.uploader.destroy(listing.image.filename);

    // ☁️ Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "wanderlust_dev",
    });

    // 💾 Save new image
    listing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    // 🧹 Delete temp file
    fs.unlinkSync(req.file.path);
  }

  // 🔹 Save updated listing
  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
