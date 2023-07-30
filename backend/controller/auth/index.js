const express = require("express");
const catchAsync = require("../../utils/CatchAsync");
const router = express();
const authController = require("./auth");

router.post("/login", catchAsync(authController.login));
router.post("/signup", catchAsync(authController.signup));
router.post("/verify", catchAsync(authController.verify));
router.post("/send-email-code", catchAsync(authController.sendEmailVerificationCode));
router.post("/verify-email-code", catchAsync(authController.verifyEmailVerificationCode));
router.post("/reset-password", catchAsync(authController.resetPassword));
router.post("/send-forgot-password-code", catchAsync(authController.sendForgotPasswordCode));


module.exports = router;