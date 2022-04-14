const db = require("../lib/db");

// Create and Save a new Manuscript
exports.create = (req, res) => {
  console.log("manuscripts.controller create");
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Nope, sorry, id can not be null.",
    });
    return;
  }

  //  id | book | witness                  | w;
  // ----+------+--------------------------+-----
  //   1 | Oba  | EMIP1029MihGed54_15-16th | W01
  //   2 | Oba  | EMIP2007Tweed58_18th     | W02
  var o = req.body;
  vars = [o.id, o.id_for_publication, o.id_1, o.id_2, o.id_3, o.id_4, o.repository, o.language];

  var rs = db
    .query(
      "insert into manuscript (id, id_for_publication, id_1, id_2, id_3, id_4, repository, language) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      vars
    )
    .then((data) => {
      console.log("  insert success rc: ", data, " results: ", data.results);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `Inserted manuscript with id=${o.id} id_1=${o.id_1}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error insert manuscripts: id: ${o.id} id_1: ${o.id_1}`,
      });
    });
};

/*
theot_testing=# \d manuscripts
                             Table "public.manuscripts"
 Column  |  Type   | Collation | Nullable |             Default
---------+---------+-----------+----------+----------------------------------
 book    | text    |           |          |
 witness | text    |           |          |
 w       | text    |           |          |
 verses  | text[]  |           |          |
 cols    | text[]  |           |          |
 ones    | text[]  |           |          |
 id      | integer |           | not null | nextval('manuscripts_id_seq'::regclass)
*/

// Retrieve all Manuscripts from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for manuscript");
  var rs = db
    .query(
      `select id, id_1, repository, date_century from manuscript order by id`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Manuscripts.",
      });
    });
};

exports.findWitness = (req, res) => {
  const manuscript = req.params.manuscript || null;
  console.log("findWitness", manuscript);
  let vars = null;
  if (manuscript === null) {
    res.send({ message: "Sorry, manuscript was null." });
    return;
  }
  vars = [manuscript];

  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from manuscripts where witness = $1 order by book, witness`,
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

// Find a single Manuscripts with an id
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
      `select id, book, witness, w, verses, ones from manuscripts where id = $1 order by book, witness`,
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

  // Manuscripts.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving Manuscripts with id=" + id,
  //     });
  //   });
};

// Update a Manuscripts by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Manuscripts.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Manuscripts was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update Manuscripts with id=${id}. Maybe Manuscripts was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating Manuscripts with id=" + id,
  //     });
  //   });
};

// Delete a Manuscripts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // Manuscripts.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Manuscripts was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete Manuscripts with id=${id}. Maybe Manuscripts was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete Manuscripts with id=" + id,
  //     });
  //   });
};

// Delete all Manuscripts from the database.
exports.deleteAll = (req, res) => {
  // Manuscripts.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} Manuscripts were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all Manuscripts.",
  //     });
  //   });
};
