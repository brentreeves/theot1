module.exports = (app) => {
  const rat = require("../controllers/ratio.controller.js");

  var router = require("express").Router();

  console.log("ratio.routes.js");
  // Retrieve all dots
  router.get("/", rat.findRatios);

  app.use("/api/ratio", router);
};
