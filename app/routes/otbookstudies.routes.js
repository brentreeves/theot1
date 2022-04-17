module.exports = (app) => {
  const otbookstudies = require("../controllers/otbookstudies.controller.js");

  var router = require("express").Router();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET");
    next();
  });

  // Create a new otbookstudy
  router.post("/", otbookstudies.create);

  // Retrieve all otbookstudies
  router.get("/", otbookstudies.findAll);

  // Retrieve a single otbookstudy by id
  router.get("/:otbookstudy", otbookstudies.findWitness);

  // Update a otbookstudy with id
  router.put("/:book", otbookstudies.update);

  // Delete a otbookstudy by id
  router.delete("/:book", otbookstudies.delete);

  // Delete all otbookstudies
  router.delete("/", otbookstudies.deleteAll);

  app.use("/api/otbookstudies", router);
};
