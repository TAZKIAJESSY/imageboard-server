const { Router } = require("express");
const router = new Router(); //crete a router class

const Image = require("../models").image;

router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 2, 50); // limit indicates how many results are on a page.
  //Math.min function compares which is min value and returns
  const offset = req.query.offset || 0;

  try {
    const result = await Image.findAndCountAll({ limit, offset });
    res.send({ images: result.rows, total: result.count });
  } catch (error) {
    next(error);
  }
});
//http :4000/images offset==0 limit==2

router.post("/", async (req, res, next) => {
  try {
    const createImage = await Image.create(req.body);
    res.send(createImage);
  } catch (error) {
    next(error.message);
  }
});
//http POST :4000/images url=https://picjumbo.com/wp-content/uploads/flying-hearts-on-yellow-background-1080x720.jpg

router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const specificImage = await Image.findByPk(imageId);
    res.send(specificImage);
  } catch (e) {
    next(e);
  }
});
//http GET :4000/images/3

module.exports = router;
