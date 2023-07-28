const express = require("express");
const PostsRouter = express();
const posts = require("./posts");
const auth = require("../../middlewares/auth/auth");
const catchAsync = require("../../utils/CatchAsync");
const multer = require("../../utils/multer");

PostsRouter.get("/all", catchAsync(posts.getAll));
PostsRouter.get("/:id", catchAsync(posts.getPostById));
PostsRouter.delete("/:id", catchAsync(posts.deleteById));
PostsRouter.put("/:id",catchAsync(posts.updateById));
PostsRouter.get("/my-posts/:id",catchAsync(posts.myPosts));

PostsRouter.use(auth.authenticate);
PostsRouter.post("/", multer.single("ridePicture"), catchAsync(posts.create));

module.exports = PostsRouter;