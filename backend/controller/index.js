const auth = require("./auth/index");
const admin = require("./admin/index");
const user = require("./user/index");
const posts = require("./posts/index");

const controllers = {
    auth,
    admin,
    user,
    posts,
}

module.exports = controllers;