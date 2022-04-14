module.exports = (app) => {
  const variantssets = require("../controllers/variantssets.controller.js");

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

  // Create a new variantsset
  router.post("/", variantssets.create);

  // Retrieve all variantssets
  router.get("/", variantssets.findAll);

  // Retrieve a single variantsset by id
  router.get("/:variantsset", variantssets.findVariantsSet);

  // Update a variantsset with id
  router.put("/:ot_book", variantssets.update);

  // Delete a variantsset by id
  router.delete("/:ot_book", variantssets.delete);

  // Delete all variantssets
  router.delete("/", variantssets.deleteAll);

  app.use("/api/variantssets", router);
};
