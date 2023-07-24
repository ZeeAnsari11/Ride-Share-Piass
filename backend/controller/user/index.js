const express = require("express");
const router = express();
const user = require("./user");
const auth = require("../../middlewares/auth/auth");
const catchAsync = require("../../utils/CatchAsync");

router.use(auth.authenticate);
router.get("/:id", catchAsync(user.getById));

module.exports = router;