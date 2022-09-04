const {Router} = require("express");
const user      = require("./user")
const router = Router();

router.get("/login");
router.get("/signup");
router.post("/login", user.login);
router.post("/signup", user.signup);

module.exports = router;