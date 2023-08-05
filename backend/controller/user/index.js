const express = require("express");
const router = express();
const user = require("./user");
const auth = require("../../middlewares/auth/auth");
const catchAsync = require("../../utils/CatchAsync");
const multer = require("../../utils/multer");

router.use(auth.authenticate);
router.get("/:id", catchAsync(user.getById));
router.post("/profile-request", multer.array("image", 3), catchAsync(user.submitProfileRequest));

module.exports = router;