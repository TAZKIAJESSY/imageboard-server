const { Router } = require("express");
const { toJWT, toData } = require("../authentication/jwt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === " " || password === " ") {
    res.status(400).send("Please provide a valid email and pasword");
  } else {
    const user = await User.findOne({ where: { email: email } });
    if (!User) {
      res.status(400).send("User not found");
    } else {
      userPassword = user.password;
      return res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  }
});
//http POST :4000/auth/login email=jessy@hmail.com password=password
//http POST :4000/auth/login email=manish@gmail.com password=welcome

module.exports = router;
