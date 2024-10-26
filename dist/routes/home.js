var express = require("express");
var router = express.Router();
var homeController = require("../app/controller/homeController");
var cors = require("cors");
var allowCors = "http://localhost:3000";
module.exports = router;
router.get("/fake-api", cors(allowCors), homeController.home);
