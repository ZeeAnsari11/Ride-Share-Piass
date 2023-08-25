const express = require("express");
const router = express();
const admin = require("./admin");
const auth = require("../../middlewares/auth/auth");
const catchAsync = require("../../utils/CatchAsync");

router.post("/login", admin.login);
router.use(auth.authenticate);
router.get("/users", catchAsync(admin.getUsers));


module.exports = router;