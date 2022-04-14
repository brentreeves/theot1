const db = require("../lib/db");

//import * as util from 'util' // has no default export
//import { inspect } from 'util' // or directly
// or 
var util = require('util')



// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("\n\n");
  console.log("rscripts.controller create");
  
  // console.log('111111111111111111111111111111111111');
  // console.log("log req:");
  // //console.log(req);
  // console.log("gives error");
  // console.log('222222222222222222222222222222222222');
  // console.log("log req.body:");
  // console.log(req.body);
  // console.log('333333333333333333333333333333333333');
  // console.log("log req.body.ot_book:");
  // console.log(req.body.ot_book);
  // console.log('444444444444444444444444444444444444');
  // console.log("log req.body['ot_book']:");
  // console.log(req.body['ot_book']);
  // console.log('555555555555555555555555555555555555');

  // console.log("log req.params: " + req.params);
  // console.log("log req.params.ot_book: " + req.params.ot_book);

  // console.log("log req.query: " + req.query);
  // console.log("log req.query.ot_book: " + req.query.ot_book);

  // console.log('inspect');
  // var inspectReq = util.inspect(req);
  // console.log(inspectReq);
  // var inspectReqBody = util.inspect(req.body);
  // console.log(inspectReqBody);

  // console.log("log req.body.study_no: " + req.body.study_no);

  //console.log("log res: " + res);
  //console.log("log res.body: " + res.body);
  //console.log("log res.body.ot_book: " + res.body.ot_book);
  //console.log("log res.body.study_no: " + res.body.study_no);

  //console.table("table req: " + req);
  //console.table("table req.body: " + req.body);
  //console.table("table req.body.ot_book: " + req.body.ot_book);

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
  //var strReqBodyOTBook = JSON.stringify(req.body.ot_book);
  //console.log("log stringify req.body.ot_book: " + strReqBody.ot_book);

  // console.log("log res: " + res);
  // console.log("log res.body: " + res.body);
  // console.log("log res.body.ot_book: " + res.body.ot_book);
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

//   var parsedReqBodyOtbook = JSON.parse(req.body.ot_book);
//   console.log('parsedReqBodyOtbook');
//   console.log(parsedReqBodyOtbook);

//   var parsedReqBodyOtbookBrackets = JSON.parse(req.body['ot_book']);
//   console.log('parsedReqBodyOtbookBrackets');
//   console.log(parsedReqBodyOtbookBrackets);
//   console.log('end parse');
   // console.log("log stringify req.body.ot_book: " + JSON.stringify(req.body.ot_book));

  console.log('before forEach');
  Object.keys(req.body).forEach((prop)=> console.log(prop));
  console.log('after forEach');

  // Validate request
  if (!req.body.ot_book) {
    console.log("Nope, sorry, ot_book cannot be null.");
    res.status(400).send({
      message: "Nope, sorry, ot_book cannot be null.",
    });
    return;
  }
  console.log('ot_book is OK !');

  console.log("req.body: " + req.body);
  var o = req.body;
  console.log("here");
  console.log("o: " + o);
  vars = [o.ot_book, o.study_no, o.date_created, o.ratios_include_unique_readings, o.percentages_include_unique_readings, o.ratios_exclude_unique_plusses, o.percentages_exclude_unique_plusses, o.ratios_exclude_unique_readings, o.percentages_exclude_unique_readings];

  var rs = db
    .query(
      "insert into percent_agreement (ot_book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      vars
    )
    .then((data) => {
      console.log("rscripts.js insert success: ", data, " results: ", data.results, " error: ", data.error);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `rscripts.js Inserted percent_agreement with ot_book=${o.ot_book} study_no=${o.study_no}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `rscripts.js Error insert percent_agreement: ot_book: ${o.ot_book} study_no: ${o.study_no}`,
      });
    });
};

// Retrieve all rscripts from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for rscripts");
  var rs = db
      .query(
	  'select ot_book, study_no, date_created, description, exclude_type, linkage_method, csv_file_name, rscript_file_name from r_script order by ot_book, study_no',
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rscripts.",
      });
    });
};

exports.findRScript = (req, res) => {
  const rscript = req.params.rscript || null;
  console.log("findRScript", rscript);
  let vars = null;
  if (rscript === null) {
    res.send({ message: "Sorry, rscript was null." });
    return;
  }

  // rscript is in format {ot_book}-{study_no}
  // example 'oba-2'
  var compositKeyArray = rscript.split('-');

  //vars = [rscript];

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

// Find a single rscripts with an id
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

  // rscripts.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving rscripts with id=" + id,
  //     });
  //   });
};

// Update a rscripts by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // rscripts.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "rscripts was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update rscripts with id=${id}. Maybe rscripts was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating rscripts with id=" + id,
  //     });
  //   });
};

// Delete a rscripts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // rscripts.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "rscripts was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete rscripts with id=${id}. Maybe rscripts was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete rscripts with id=" + id,
  //     });
  //   });
};

// Delete all rscripts from the database.
exports.deleteAll = (req, res) => {
  // rscripts.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} rscripts were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all rscripts.",
  //     });
  //   });
};

function showProps(obj, objName) {
  console.log('start shooooooooooooooooooooooooooowProps');
  let result = '';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      console.log('i');
      console.log(i);
      console.log('obj[i]');
      console.log(obj[i]);
      result += `${objName}.${i} = ${obj[i]}\n`;
      console.log('incremental result');
      console.log(result);
    }
  }
  console.log("showProps results");
  console.log(result);
  console.log('end   shooooooooooooooooooooooooooowProps');
}
