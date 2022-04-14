const db = require("../lib/db");

// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("otbookstudies.controller create");
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

// Retrieve all otbookstudies from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for otbookstudies");
  var rs = db
    .query(
      `select ot_book, study_no, description, date_created, mss_used, tvus, google_ss_url, notes from ot_book_study order by ot_book`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving otbookstudies.",
      });
    });
};

exports.findWitness = (req, res) => {
  const otbookstudy = req.params.otbookstudy || null;
  console.log("findWitness", otbookstudy);
  let vars = null;
  if (otbookstudy === null) {
    res.send({ message: "Sorry, otbookstudy was null." });
    return;
  }
  vars = [otbookstudy];

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

// Find a single otbookstudies with an id
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

  // otbookstudies.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving otbookstudies with id=" + id,
  //     });
  //   });
};

// Update a otbookstudies by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // otbookstudies.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "otbookstudies was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update otbookstudies with id=${id}. Maybe otbookstudies was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating otbookstudies with id=" + id,
  //     });
  //   });
};

// Delete a otbookstudies with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // otbookstudies.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "otbookstudies was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete otbookstudies with id=${id}. Maybe otbookstudies was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete otbookstudies with id=" + id,
  //     });
  //   });
};

// Delete all otbookstudies from the database.
exports.deleteAll = (req, res) => {
  // otbookstudies.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} otbookstudies were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all otbookstudies.",
  //     });
  //   });
};
