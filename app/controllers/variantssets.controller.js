const db = require("../lib/db");

// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("variantssets.controller create");
  // Validate request
  if (!req.body.ot_book) {
    res.status(400).send({
      message: "Nope, sorry, ot_book cannot be null.",
    });
    return;
  }

  var o = req.body;
  vars = [o.ot_book, o.study_no, o.date_created, o.variants];

  var rs = db
    .query(
      "insert into variants_set (ot_book, study_no, date_created, variants) values ($1, $2, $3, $4)",
      vars
    )
    .then((data) => {
      console.log("variantssets.js insert success: ", data, " results: ", data.results, " error: ", data.error);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `variantssets.js Inserted variants_set with ot_book=${o.ot_book} study_no=${o.study_no}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `variantssets.js Error insert variants_set: ot_book: ${o.ot_book} id_1: ${o.study_no}`,
      });
    });
};

// Retrieve all variantssets from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for variantssets");
  var rs = db
    .query(
      `select ot_book, study_no, date_created, variants from variants_set order by ot_book, study_no`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving variantssets.",
      });
    });
};

exports.findVariantsSet = (req, res) => {
  const variantsset = req.params.variantsset || null;
  console.log("findVariantsSet", variantsset);
  let vars = null;
  if (variantsset === null) {
    res.send({ message: "Sorry, variantsset was null." });
    return;
  }

  // variantsset is in format {ot_book}-{study_no}
  // example 'oba-2'
  var compositKeyArray = variantsset.split('-');

  //vars = [variantsset];

  var rs = db
    .query(
      `select ot_book, study_no, date_created, variants from variants_set where ot_book = $1 and study_no = $2 order by ot_book, study_no`,
      compositKeyArray
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
};

// Find a single variantssets with an id
exports.findId = (req, res) => {
  const id = req.params.id;

  console.log("witness findId: ", id);
  vars = [id];
  if (id == null) {
    res.send({ id: null, message: `Sorry ID: ${id} not found.` });
    return;
  }
  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from ot_book_study where id = $1 order by book, witness`,
      vars
    )
    .then((data) => {
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  // variantssets.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving variantssets with id=" + id,
  //     });
  //   });
};

// Update a variantssets by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // variantssets.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "variantssets was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update variantssets with id=${id}. Maybe variantssets was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating variantssets with id=" + id,
  //     });
  //   });
};

// Delete a variantssets with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // variantssets.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "variantssets was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete variantssets with id=${id}. Maybe variantssets was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete variantssets with id=" + id,
  //     });
  //   });
};

// Delete all variantssets from the database.
exports.deleteAll = (req, res) => {
  // variantssets.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} variantssets were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all variantssets.",
  //     });
  //   });
};
