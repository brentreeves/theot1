const db = require("../lib/db");
const rr = require("../lib/util");

// Calculate Ratios from the Dots.
exports.findAll = async (req, res) => {
  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from dots order by book, witness`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      // res.send(data.results);
      rr.data_to_ratios_json(rows.body.results, "percent")
        .then((rc) => {
          res.send(rc);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "data_to_ratios_json not happy",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Dots.",
      });
    });
};

exports.findRatios = async (req, res) => {
  const book = req.query.book || "Oba";
  vars = [book];
  var rs = db
    .query(
      "select book, witness, w, array_length(ones,1) n, ones from dots where book = $1 order by book, w",
      vars
    )
    .then((data) => {
      // console.log("findRatios ", data);
      rr.data_to_outputs_json(data.results, "percent")
        .then((rc) => {
          // console.log("data_to_outputs_json returns: ", rc);
          res.send(rc);
        })
        .catch((err) => {
          console.log("rr.data_to_outputs_json not happy", err);
          res.status(500).send({
            message: err.message || "findRatios data_to_outputs_json not happy",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Dots.",
      });
    });
};

// Find a single Dots with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  // Dots.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving Dots with id=" + id,
  //     });
  //   });
};

// Update a Dots by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Dots.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Dots was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update Dots with id=${id}. Maybe Dots was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating Dots with id=" + id,
  //     });
  //   });
};

// Delete a Dots with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // Dots.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Dots was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete Dots with id=${id}. Maybe Dots was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete Dots with id=" + id,
  //     });
  //   });
};

// Delete all Dots from the database.
exports.deleteAll = (req, res) => {
  // Dots.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} Dots were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all Dots.",
  //     });
  //   });
};
