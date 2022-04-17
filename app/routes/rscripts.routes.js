module.exports = (app) => {
  const rscripts = require("../controllers/rscripts.controller.js");

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

  // Create a new rscript
  router.post("/", rscripts.create);

  // Retrieve all rscripts
  router.get("/", rscripts.findAll);

  // Retrieve a single rscript by id
  router.get("/:rscript", rscripts.findRScript);

  // Update a rscript with id
  router.put("/:book", rscripts.update);

  // Delete a rscript by id
  router.delete("/:book", rscripts.delete);

  // Delete all rscripts
  router.delete("/", rscripts.deleteAll);

  app.use("/api/rscripts", router);
};
