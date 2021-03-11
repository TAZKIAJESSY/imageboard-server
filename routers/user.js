const { Router } = require("express");
const User = require("../models").user;

const router = new Router();
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await User.create({
        email,
        password,
        fullName,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});
//http POST :4000/users fullName=TazkiaJessy email=jessy@hmail.com password=password

module.exports = router;
