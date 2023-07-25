const express = require("express");
const router = express();
const auth = require("../../middlewares/auth/auth");
const catchAsync = require("../../utils/CatchAsync");
const chat = require("./chat")

router.use(auth.authenticate);
router.post("/conversations", catchAsync(chat.createChat))
router.get("/conversations/:id", catchAsync(chat.getAllChatsOfUser))
router.delete("/conversations/:id", catchAsync(chat.deleteChat))
router.get("/messages/:id", catchAsync(chat.getAllChatMessages))
router.post("/read-all/:id", catchAsync(chat.getAllChatMessages))


module.exports = router;