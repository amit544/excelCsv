const express = require("express");
const app = express.Router();
const multer = require("multer");
const userController = require("../controller/user.controller");
app
  .route("/uploadcsv")
  .post(
    multer({ storage: multer.memoryStorage() }).single("file"),
    userController.uploadCsv
  );
  app
  .route("/getUserDetails")
  .get(
    //multer({ storage: multer.memoryStorage() }).single("file"),
    userController.getUserDetail
  ); 

module.exports = app;
