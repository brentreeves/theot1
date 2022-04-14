module.exports = (app) => {
  const manuscripts = require("../controllers/manuscripts.controller.js");

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

  // Create a new manuscript
  router.post("/", manuscripts.create);

  // Retrieve all manuscripts
  router.get("/", manuscripts.findAll);

  // Retrieve a single manuscript by id
  router.get("/:manuscript", manuscripts.findWitness);

  // Update a manuscript with id
  router.put("/:id", manuscripts.update);

  // Delete a manuscript by id
  router.delete("/:id", manuscripts.delete);

  // Delete all manuscripts
  router.delete("/", manuscripts.deleteAll);

  app.use("/api/manuscripts", router);
};
