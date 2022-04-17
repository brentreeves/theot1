module.exports = (app) => {
  const manuscriptdescriptions = require("../controllers/manuscriptdescriptions.controller.js");

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

  // Create a new manuscriptdescription
  router.post("/", manuscriptdescriptions.create);

  // Retrieve all manuscriptdescriptions
  router.get("/", manuscriptdescriptions.findAll);

  // Retrieve a single manuscriptdescription by id
  router.get("/:manuscriptdescription", manuscriptdescriptions.findWitness);

  // Update a manuscriptdescription with id
  router.put("/:book", manuscriptdescriptions.update);

  // Delete a manuscriptdescription by id
  router.delete("/:book", manuscriptdescriptions.delete);

  // Delete all manuscriptdescriptions
  router.delete("/", manuscriptdescriptions.deleteAll);

  app.use("/api/manuscriptdescriptions", router);
};
