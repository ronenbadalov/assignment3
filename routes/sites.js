const express = require("express");
const router = express.Router();
const Site = require("../models/site");

// Getting all
router.get("/", async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting one
router.get("/:id", getSite, (req, res) => {
  res.json(res.site);
});
// Creating one
router.post("/", async (req, res) => {
  const site = new Site({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
  });
  try {
    const newSite = await site.save();
    res.status(201).json(newSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating one
router.patch("/:id", getSite, async (req, res) => {
  if (req.body.title != null) {
    res.site.title = req.body.title;
  }
  if (req.body.image != null) {
    res.site.image = req.body.image;
  }
  if (req.body.description != null) {
    res.site.description = req.body.description;
  }
  try {
    const updatedSite = await res.site.save();
    res.json(updatedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting one
router.delete("/:id", getSite, async (req, res) => {
  try {
    await res.site.remove();
    res.json({ message: "Site Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSite(req, res, next) {
  let site;
  try {
    site = await Site.findById(req.params.id);
    if (site == null) {
      return res.status(404).json({ message: "Cannot find site" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.site = site;
  next();
}

module.exports = router;
