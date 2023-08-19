const express = require("express");
const router = express();
const admin = require("./admin");
const auth = require("../../middlewares/auth/auth");

router.post("/login", admin.login);
router.use(auth.authenticate);


module.exports = router;