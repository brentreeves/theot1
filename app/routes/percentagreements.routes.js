module.exports = (app) => {
  const percentagreements = require("../controllers/percentagreements.controller.js");

  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET", "POST");
    next();
  });

  // Create a new percentagreement
  router.post("/", percentagreements.create);

  // Retrieve all percentagreements
  router.get("/", percentagreements.findAll);

  // Retrieve a single percentagreement by id
  router.get("/:percentagreement", percentagreements.findPercentAgreement);

  // Update a percentagreement with id
  router.put("/:book", percentagreements.update);

  // Delete a percentagreement by id
  router.delete("/:book", percentagreements.delete);

  // Delete all percentagreements
  router.delete("/", percentagreements.deleteAll);

  app.use("/api/percentagreements", router);
};
