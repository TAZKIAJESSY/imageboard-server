const { Router } = require("express");
const router = new Router(); //crete a router class

const Image = require("../models").image;

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const createImage = await Image.create(req.body);
    res.send(createImage);
  } catch (error) {
    next(error.message);
  }
});
module.exports = router;

//http POST :4000/images url=https://picjumbo.com/wp-content/uploads/flying-hearts-on-yellow-background-1080x720.jpg
