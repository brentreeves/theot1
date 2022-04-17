module.exports = (app) => {
  const generaterscripts = require("../controllers/generaterscripts.controller.js");

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

  // Create a new generaterscript
  router.post("/", generaterscripts.create);

  // Retrieve all generaterscripts
  router.get("/", generaterscripts.findAll);

  // Retrieve a single generaterscript by id
  router.get("/:generaterscript", generaterscripts.findGenerateRScript);

  // Update a generaterscript with id
  router.put("/:book", generaterscripts.update);

  // Delete a generaterscript by id
  router.delete("/:book", generaterscripts.delete);

  // Delete all generaterscripts
  router.delete("/", generaterscripts.deleteAll);

  app.use("/api/generaterscripts", router);
};
