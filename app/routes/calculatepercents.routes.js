module.exports = (app) => {
  const calculatepercents = require("../controllers/calculatepercents.controller.js");

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

  // Create a new calculatepercent
  router.post("/", calculatepercents.create);

  // Retrieve all calculatepercents
  router.get("/", calculatepercents.findAll);

  // Retrieve a single calculatepercent by id
  router.get("/:calculatepercent", calculatepercents.findCalculatePercent);

  // Update a calculatepercent with id
  router.put("/:ot_book", calculatepercents.update);

  // Delete a calculatepercent by id
  router.delete("/:ot_book", calculatepercents.delete);

  // Delete all calculatepercents
  router.delete("/", calculatepercents.deleteAll);

  app.use("/api/calculatepercents", router);
};
