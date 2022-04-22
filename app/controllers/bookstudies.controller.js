const db = require("../db");

// Create and Save a new OT Book study
exports.add = (id, bookname) => {
    console.log("bookstudies.controller create");
    // Validate request
    if (!req.body.id) {
	res.status(400).send({
	    message: "Sorry, book ID cannot be null.",
	});
	return;
    }
    
    var o = req.body;
    vars = [id, bookname];
    
    var rs = db
	.query(
	    "insert into book_study (id, name) values ($1, $2) returning *",
	    vars
	)
	.then((data) => {
	    log(4,`bs.js insert: ${JSON.stringify(data)}`);
	    return data;
	})
	.catch((err) => {
	    log(4,`bs.js error: ${JSON.stringify(err)}`);
	    return {"msg" : err.message, "error":err}
	})
}


// Retrieve all bookstudies from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for bookstudies");
  var rs = db
    .query(
      `select book, study_no, description, date_created, mss_used, tvus, google_ss_url, notes from book_study order by book`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookstudies.",
      });
    });
};

exports.findWitness = (req, res) => {
  const bookstudy = req.params.bookstudy || null;
  console.log("findWitness", bookstudy);
  let vars = null;
  if (bookstudy === null) {
    res.send({ message: "Sorry, bookstudy was null." });
    return;
  }
  vars = [bookstudy];

  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from book_study where witness = $1 order by book, witness`,
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

// Find a single bookstudies with an id
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
      `select id, book, witness, w, verses, ones from book_study where id = $1 order by book, witness`,
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

  // bookstudies.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving bookstudies with id=" + id,
  //     });
  //   });
};

// Update a bookstudies by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // bookstudies.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "bookstudies was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update bookstudies with id=${id}. Maybe bookstudies was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating bookstudies with id=" + id,
  //     });
  //   });
};

// Delete a bookstudies with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // bookstudies.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "bookstudies was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete bookstudies with id=${id}. Maybe bookstudies was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete bookstudies with id=" + id,
  //     });
  //   });
};

// Delete all bookstudies from the database.
exports.deleteAll = (req, res) => {
  // bookstudies.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} bookstudies were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all bookstudies.",
  //     });
  //   });
};
