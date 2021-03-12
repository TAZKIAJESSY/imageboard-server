const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../authentication/jwt");
const User = require("../models").user;
const authMiddleware = require("../authentication/middleware");

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
      const result = bcrypt.compareSync(password, userPassword);
      if (result) {
        res.send({ jwt: toJWT({ userId: 1 }) });
      } else {
        res.status(404).send({ message: "Password was incorrect." });
      }
    }
  }
});
//http POST :4000/auth/login email=jessy@hmail.com password=password
//http POST :4000/auth/login email=manish@gmail.com password=welcome

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});
// http POST :4000/auth/login email=manish@gmail.com password=welcome
//http GET :4000/auth/test-auth Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNTU2NDU0MywiZXhwIjoxNjE1NTcxNzQzfQ.NznaW1f_5ZWsImmhY1kpTIdT0SnvC8gcFRyf4EuH874"
module.exports = router;
