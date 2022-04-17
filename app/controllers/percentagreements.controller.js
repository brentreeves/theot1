const db = require("../lib/db");

//import * as util from 'util' // has no default export
//import { inspect } from 'util' // or directly
// or
var util = require("util");

// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("\n\n");
  console.log("percentagreements.controller create");

  // console.log('111111111111111111111111111111111111');
  // console.log("log req:");
  // //console.log(req);
  // console.log("gives error");
  // console.log('222222222222222222222222222222222222');
  // console.log("log req.body:");
  // console.log(req.body);
  // console.log('333333333333333333333333333333333333');
  // console.log("log req.body.book:");
  // console.log(req.body.book);
  // console.log('444444444444444444444444444444444444');
  // console.log("log req.body['book']:");
  // console.log(req.body['book']);
  // console.log('555555555555555555555555555555555555');

  // console.log("log req.params: " + req.params);
  // console.log("log req.params.book: " + req.params.book);

  // console.log("log req.query: " + req.query);
  // console.log("log req.query.book: " + req.query.book);

  // console.log('inspect');
  // var inspectReq = util.inspect(req);
  // console.log(inspectReq);
  // var inspectReqBody = util.inspect(req.body);
  // console.log(inspectReqBody);

  // console.log("log req.body.study_no: " + req.body.study_no);

  //console.log("log res: " + res);
  //console.log("log res.body: " + res.body);
  //console.log("log res.body.book: " + res.body.book);
  //console.log("log res.body.study_no: " + res.body.study_no);

  //console.table("table req: " + req);
  //console.table("table req.body: " + req.body);
  //console.table("table req.body.book: " + req.body.book);

  //console.log('util.inspect next line');
  //console.log(util.inspect(req));

  // console.log('start property')
  // var output = '';
  // //var theObject = req.body;
  // for (var property in req) {
  //   output += property + ': ' + req[property]+'; ';
  // }
  // console.log(output);
  // console.log('end property');

  // console.log("log stringify req: " + JSON.stringify(req));

  // var typeOfBody = typeof req.body;
  // console.log("typeOfBody");
  // console.log(typeOfBody);

  //var body = req.body;
  // console.log('body');
  // console.log(body);

  // var bodyZero = body[0];
  // console.log('bodyZero');
  // console.log(bodyZero);

  // console.log('showProps');
  // showProps(body, 'body');

  // console.log("log stringify body:");
  // console.log(JSON.stringify(body));
  // var strReqBody = JSON.stringify(req.body);
  // console.log("log stringify req.body: " + strReqBody);
  //var strReqBodyOTBook = JSON.stringify(req.body.book);
  //console.log("log stringify req.body.book: " + strReqBody.book);

  // console.log("log res: " + res);
  // console.log("log res.body: " + res.body);
  // console.log("log res.body.book: " + res.body.book);
  // console.log("log res.body.study_no: " + res.body.study_no);

  //   body = JSON.stringify(body);
  // // preserve newlines, etc - use valid JSON
  // body = body.replace(/\\n/g, "\\n")
  //                .replace(/\\'/g, "\\'")
  //                .replace(/\\"/g, '\\"')
  //                .replace(/\\&/g, "\\&")
  //                .replace(/\\r/g, "\\r")
  //                .replace(/\\t/g, "\\t")
  //                .replace(/\\b/g, "\\b")
  //                .replace(/\\f/g, "\\f");
  // // remove non-printable and other non-valid JSON chars
  // body = body.replace(/[\u0000-\u0019]+/g,"");
  // console.log("body");
  // console.log(body);

  //var o = JSON.parse(body);

  //console.log("o");
  //console.log(o);

  //  console.log('start parse');
  //   var parsedReqBody = JSON.parse(req.body);
  //   console.log('parsedReqBody');
  //   console.log(parsedReqBody);

  //   var parsedReqBodyOtbook = JSON.parse(req.body.book);
  //   console.log('parsedReqBodyOtbook');
  //   console.log(parsedReqBodyOtbook);

  //   var parsedReqBodyOtbookBrackets = JSON.parse(req.body['book']);
  //   console.log('parsedReqBodyOtbookBrackets');
  //   console.log(parsedReqBodyOtbookBrackets);
  //   console.log('end parse');
  // console.log("log stringify req.body.book: " + JSON.stringify(req.body.book));

  console.log("before forEach");
  Object.keys(req.body).forEach((prop) => console.log(prop));
  console.log("after forEach");

  console.log("entries: ", Object.entries(req.body));

  // Validate request
  if (!req.body.book) {
    console.log("Nope, sorry, book cannot be null.");
    res.status(400).send({
      message: "Nope, sorry, book cannot be null.",
    });
    return;
  }
  console.log("book is OK !");

  console.log("req.body: " + req.body);
  var o = req.body;
  console.log("here");
  console.log("o: " + o);
  vars = [
    o.book,
    o.study_no,
    o.date_created,
    o.ratios_include_unique_readings,
    o.percentages_include_unique_readings,
    o.ratios_exclude_unique_plusses,
    o.percentages_exclude_unique_plusses,
    o.ratios_exclude_unique_readings,
    o.percentages_exclude_unique_readings,
  ];

  var rs = db
    .query(
      "insert into percent_agreement (book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      vars
    )
    .then((data) => {
      console.log(
        "percentagreements.js insert success: ",
        data,
        " results: ",
        data.results,
        " error: ",
        data.error
      );
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `percentagreements.js Inserted percent_agreement with book=${o.book} study_no=${o.study_no}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `percentagreements.js Error insert percent_agreement: book: ${o.book} study_no: ${o.study_no}`,
      });
    });
};

// Retrieve all percentagreements from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for percentagreements");
  var rs = db
    .query(
      `select book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings from percent_agreement order by book, study_no`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving percentagreements.",
      });
    });
};

exports.findPercentAgreement = (req, res) => {
  
  const percentagreement = req.params.percentagreement || null;
  console.log("findPercentAgreement", percentagreement);
  let vars = null;
  if (percentagreement === null) {
    res.send({ message: "Sorry, percentagreement was null." });
    return;
  }

  // percentagreement is in format {book}-{study_no}
  // example 'oba-2'
  var compositKeyArray = percentagreement.split("-");

  //vars = [percentagreement];

  var rs = db
    .query(
      `select book, study_no, date_created, variants from variants_set where book = $1 and study_no = $2 order by book, study_no`,
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

// Find a single percentagreements with an id
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

  // percentagreements.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving percentagreements with id=" + id,
  //     });
  //   });
};

// Update a percentagreements by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // percentagreements.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "percentagreements was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update percentagreements with id=${id}. Maybe percentagreements was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating percentagreements with id=" + id,
  //     });
  //   });
};

// Delete a percentagreements with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // percentagreements.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "percentagreements was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete percentagreements with id=${id}. Maybe percentagreements was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete percentagreements with id=" + id,
  //     });
  //   });
};

// Delete all percentagreements from the database.
exports.deleteAll = (req, res) => {
  // percentagreements.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} percentagreements were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all percentagreements.",
  //     });
  //   });
};

function showProps(obj, objName) {
  console.log("start shooooooooooooooooooooooooooowProps");
  let result = "";
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      console.log("i");
      console.log(i);
      console.log("obj[i]");
      console.log(obj[i]);
      result += `${objName}.${i} = ${obj[i]}\n`;
      console.log("incremental result");
      console.log(result);
    }
  }
  console.log("showProps results");
  console.log(result);
  console.log("end   shooooooooooooooooooooooooooowProps");
}
