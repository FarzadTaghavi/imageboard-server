const { Router } = require("express");
const router = new Router();
const { toJWT } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").user;

const authMiddleware = require("../auth/middleware");

router.get("/test", authMiddleware, (req, res) => {
  res.send("Reached the router");
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find the user
    const user = await User.findOne({ where: { email } });
    console.log("what is the user:", user);
    // check the passwords
    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (passwordsMatch) {
      const token = toJWT({ userId: user.id });
      res.send({ token });
    } else {
      res.status(401).send("Access denied");
    }

    // respond with success of failure
  } catch (e) {
    next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    // need to get the params from the body
    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      return res.status(400).send("Missing some parameters");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("new password", hashedPassword);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    const { password: passwordNotToSend, ...restOfUser } = newUser.dataValues;

    res.send(restOfUser);

    //create a user
    // send the user back
  } catch (e) {
    next(e);
  }
});

module.exports = router;
