const db = require("../lib/db");

// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("manuscriptdescriptions.controller create");
  // Validate request
  if (!req.body.ot_book) {
    res.status(400).send({
      message: "Nope, sorry, ot_book cannot be null.",
    });
    return;
  }

  var o = req.body;
  vars = [o.ot_book, o.study_no, o.description, o.date_created, o.mss_used, o.tvus, o.google_ss_url, o.notes];

  var rs = db
    .query(
      "insert into ot_book_study (ot_book, study_no, description, date_created, mss_used, tvus, google_ss_url, notes) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      vars
    )
    .then((data) => {

      console.log('otbs.js start log in then');
      console.log('data', data);
      console.log('data.config', data.config);
      console.log('data.dotenv', data.dotenv);
      console.log('data.err', data.err);
      console.log('data.error', data.error);
      console.log('data.error_message', data.error_message);
      console.log('data.errs', data.errs);
      console.log('data.results', data.results);
      console.log('data.rows', data.rows);
      console.log('data.status', data.status);
      console.log('otbs.js end log in then');

      console.log("otbs.js then insert success rc: ", data, " results: ", data.results, " error: ", data.error);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `otbs.js send Inserted ot_book_study with ot_book=${o.ot_book} study_no_1=${o.study_no}.`,
      });
    })
    .catch((err) => {
      console.log('otbs.js catch', err);

      console.log('otbs.js start log in catch');
      console.log('err', err);
      console.log('err.config', err.config);
      console.log('err.dotenv', err.dotenv);
      console.log('err.err', err.err);
      console.log('err.error', err.error);
      console.log('err.error_message', err.error_message);
      console.log('err.errs', err.errs);
      console.log('err.results', err.results);
      console.log('err.rows', err.rows);
      console.log('err.status', err.status);
      console.log('otbs.js end log in catch');

      res.status(500).send({
        message:
          err.message ||
          `otbs.js catch/send Error insert ot_book_study: id: ${o.id} id_1: ${o.id_1}`,
      });
    });
};

// Retrieve all manuscriptdescriptions from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for manuscriptdescriptions");
  var rs = db
    .query(
      `select theot_description, theot_id from manuscript_description order by theot_description`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving manuscriptdescriptions.",
      });
    });
};

exports.findWitness = (req, res) => {
  const manuscriptdescription = req.params.manuscriptdescription || null;
  console.log("findWitness", manuscriptdescription);
  let vars = null;
  if (manuscriptdescription === null) {
    res.send({ message: "Sorry, manuscriptdescription was null." });
    return;
  }
  vars = [manuscriptdescription];

  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from ot_book_study where witness = $1 order by book, witness`,
      vars
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

// Find a single manuscriptdescriptions with an id
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

  // manuscriptdescriptions.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving manuscriptdescriptions with id=" + id,
  //     });
  //   });
};

// Update a manuscriptdescriptions by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // manuscriptdescriptions.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "manuscriptdescriptions was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update manuscriptdescriptions with id=${id}. Maybe manuscriptdescriptions was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating manuscriptdescriptions with id=" + id,
  //     });
  //   });
};

// Delete a manuscriptdescriptions with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // manuscriptdescriptions.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "manuscriptdescriptions was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete manuscriptdescriptions with id=${id}. Maybe manuscriptdescriptions was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete manuscriptdescriptions with id=" + id,
  //     });
  //   });
};

// Delete all manuscriptdescriptions from the database.
exports.deleteAll = (req, res) => {
  // manuscriptdescriptions.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} manuscriptdescriptions were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all manuscriptdescriptions.",
  //     });
  //   });
};
