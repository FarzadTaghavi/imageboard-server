const { Router } = require("express");
const router = new Router();

const Images = require("../models").image;

router.get("/", async (req, res, next) => {
  try {
    const images = await Images.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("missing parameters");
    } else {
      const newImage = await Images.create(req.body);
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
