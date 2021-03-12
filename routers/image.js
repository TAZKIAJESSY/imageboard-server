const { Router } = require("express");
const router = new Router(); //crete a router class
const { toData } = require("../authentication/jwt");

const Image = require("../models").image;

router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 6, 50); // limit indicates how many results are on a page.
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

router.get("/auth/messy", async (req, res, next) => {
  const auth = req.headers.authorization?.split(" ");
  // same as const auth = req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // console.log(auth[1]);
    try {
      const data = toData(auth[1]);
      // console.log(data);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      console.log(e.message);
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});
//http POST :4000/auth/login fullName=Monishhaque email=manish@gmail.com password=welcome
//http :4000/images/auth/messy Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNTU1MjgwNiwiZXhwIjoxNjE1NTYwMDA2fQ.lmIfOdAIz_IhQwTMI2aniE4fzS8aAD370bA8M-Wko4"

module.exports = router;
