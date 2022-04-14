const db = require("../db");
const u = require("../util/utils");

// Create and Save a new book
exports.create = (req, res) => {
  u.log(3,"book.controller create");
  // Validate request
  if (!req.body.book) {
    res.status(400).send({
      message: "Nope, sorry, book can not be null.",
    });
    return;
  }

  //  id | book | witness                  | w;
  // ----+------+--------------------------+-----
  //   1 | Oba  | EMIP1029MihGed54_15-16th | W01
  //   2 | Oba  | EMIP2007Tweed58_18th     | W02
  var o = req.body;
  vars = [o.book, o.witness, o.w, o.verses, o.cols, o.ones];

  var rs = db
    .query(
      "insert into dots (book, witness, w, verses, cols, ones) values ($1, $2, $3, $4, $5, $6)",
      vars
    )
    .then((data) => {
      u.log(3,`  insert success rc change A: ${data},  results: ${data.results}`);
      // res.send(data.results);
      res.send({
        message: `Inserted Dots with book=${o.book} witness=${o.witness}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error insert dots: book: ${o.book} witness: ${o.witness} w: ${o.w}`,
      });
    });
};

/*
theot_testing=# \d dots
                             Table "public.dots"
 Column  |  Type   | Collation | Nullable |             Default
---------+---------+-----------+----------+----------------------------------
 book    | text    |           |          |
 witness | text    |           |          |
 w       | text    |           |          |
 verses  | text[]  |           |          |
 cols    | text[]  |           |          |
 ones    | text[]  |           |          |
 id      | integer |           | not null | nextval('dots_id_seq'::regclass)
*/

// Retrieve all Dots from the database.
exports.findAll = (req, res) => {
  u.log(3,"dots.controlloer findAll");
  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from dots order by book, witness`,
      null
    )
    .then((data) => {
      u.log(3,`  findAll  rs rowcount  ${JSON.stringify(data.rows.length)}`);
      res.send(data.rows);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Dots.",
      });
    });
};

exports.findBook = (req, res) => {
  const book = req.params.book || null;
  u.log(3,`dots.controller findBook params: ${JSON.stringify(req.params)}`);
  u.log(3,`dots.controller findBook params dot: ${book}`);
  let vars = null;
  if (book === null) {
    res.send({ message: "Sorry, book was null." });
    return;
  }
  vars = [book];

  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from dots where witness = $1 order by book, witness`,
      vars
    )
    .then((data) => {
      u.log(3,`  findbook rs results: ${data.results}`);
      u.log(3,`  findbook rs: ${data}`);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
};

// Find a single Dots with an id
exports.findId = (req, res) => {
  const id = req.params.id;

  u.log(3,`dots.controller findId params id: ${id}`);
  vars = [id];
  if (id == null) {
    res.send({ id: null, message: `Sorry ID: ${id} not found.` });
    return;
  }
  var rs = db
    .query(
      `select id, book, witness, w, verses, ones from dots where id = $1 order by book, witness`,
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


