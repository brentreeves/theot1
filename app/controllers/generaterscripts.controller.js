const db = require("../lib/db");

//import * as util from 'util' // has no default export
//import { inspect } from 'util' // or directly
// or 
var util = require('util');
//var pCalculator = require('percentCalculator');
const { findVariantsSet } = require("./variantssets.controller");



// Create and Save a new OT Book study
exports.create = (req, res) => {
  console.log("\n\n");
  console.log("generaterscripts.controller create");
  
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
      console.log("generaterscripts.js insert success: ", data, " results: ", data.results, " error: ", data.error);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `generaterscripts.js Inserted percent_agreement with ot_book=${o.ot_book} study_no=${o.study_no}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `generaterscripts.js Error insert percent_agreement: ot_book: ${o.ot_book} study_no: ${o.study_no}`,
      });
    });
};

// Retrieve all generaterscripts from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for generaterscripts");
  var rs = db
    .query(
      `select ot_book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings from percent_agreement order by ot_book, study_no`,
      null
    )
    .then((data) => {
      // console.log("rs ", data);
      res.send(data.results);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving generaterscripts.",
      });
    });
};


/* 1111111111111111111111111111111111111 */

exports.findGenerateRScript = (req, res) => {

  const generaterscript = req.params.generaterscript || null;
  console.log("in findGenerateRScript", generaterscript);

  let vars = null;
  if (generaterscript === null) {
    res.send({ message: "Sorry, generaterscript was null." });
    return;
  }

  // generaterscript is in format {ot_book}-{study_no}
  // example 'oba-2'
  var compositeKeyArray = generaterscript.split('-');
  otBook = compositeKeyArray[0];
  studyNo = compositeKeyArray[1];

  var rsg = new rScriptGenerator(otBook, studyNo);
  rsg.init();
  rsg.getMssUsed(res);

  
};

function rScriptGenerator(otBookParam, studyNoParam) {

  let otBook = otBookParam;
  let studyNo = studyNoParam;
  let compositeKeyArray = [ otBook, studyNo ];
  let mssUsed = '';
  let numberMss = 0;
  let listForCSVFile = '';
  let percents = '';

  let otBookFullName = '';
  let excludeType = 'exclude unique plusses'; // right now this is the only one we do
  let linkageMethod = 'average'; // right now this is the only one we do

  let csvFileName = '';
  let pngFileName = '';
  let rScriptFileName = '';
  let dendrogramLabel = '';

  let msDescArray = Array();
  let msIDArray = Array();

	this.init = function() {

		//numberMss = percents.length;
    //console.log('numberMss: ', numberMss);	
	}

  this.getMssUsed = function(res) {

    db
    .query(
      `select ot_book, study_no, mss_used from ot_book_study where ot_book = $1 and study_no = $2 order by ot_book, study_no`,
      compositeKeyArray
    )
    .then((data) => {
      
      let results = data.results[0];
      mssUsed = results.mss_used; // comma-separated string of ms IDs used in the specified study
      numberMss = mssUsed.length;
      console.log('mssUsed: ' + mssUsed);
  
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

      getMssDescriptions(res);
//      var retVal = doGenerateRScripts(data, res);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
  }

  function getMssDescriptions(res) {
    var rs = db
    .query(
      `select theot_description, theot_id from manuscript_description`
    )
    .then((data) => {
      
      let results = data.results;
      // get ms desc string
      // console.log('**********************************');

      // console.log('ms descs', results);

      // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

      console.log('in getMssDescriptions');
      console.log(mssUsed);

      for (var i = 0; i < results.length; i++) {

        let result = results[i];
        msDescArray[i] = result.theot_description;
        msIDArray[i]   = result.theot_id;
      }

      for (var i = 0; i < mssUsed.length; i++) {

        var msID = mssUsed[i];
        if (i > 0) {
          listForCSVFile += ','
        }
        listForCSVFile += getDescriptionFromID(msID);
      }

      console.log('listForCSVFile: ' + listForCSVFile);

      getPercents(res);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
  }

  function getDescriptionFromID(msID) {

    let index = msIDArray.indexOf(msID);
    return msDescArray[index];
  }

  function getPercents(res) {

    // following query is hard-coded for excludeType == 'exclude unique plusses'

    var rs = db
    .query(
      `select ot_book, study_no, date_created, percentages_exclude_unique_plusses from percent_agreement where ot_book = $1 and study_no = $2 order by ot_book, study_no`,
      compositeKeyArray
    )
    .then((data) => {
     
      let results = data.results[0];    
      percents = results.percentages_exclude_unique_plusses;

      console.log('percents *************************************************************');
      console.log(percents);
  
      // OK, now we've got
      // 1. mss descriptions for first row of csv file
      // 2. percents for rest of csv file
      // we don't need anything more from database, so read to generate text for csv and R script files
      
      initForFileNameAndText();
      let fileNameAndTextTuple = generateCSVFileNameAndText();
      let csvFileName = fileNameAndTextTuple[0];
      let csvFileText = fileNameAndTextTuple[1];
      fileNameAndTextTuple = generateRScriptFileNameAndText();
      let rScriptFileName = fileNameAndTextTuple[0];
      let rScriptFileText = fileNameAndTextTuple[1];
      writeToRScripts(csvFileName, csvFileText, rScriptFileName, rScriptFileText, res);

//      var retVal = doGenerateRScripts(data, res);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
  }

  function initForFileNameAndText() {

    console.log('start initForFileNameAndText');
    otBookFullName = getBookNameFromAbbr(otBook);
    // let path = ''; // no path for relative path
    let rBaseName = `THEOT ${otBookFullName} - Study ${studyNo}`;
    csvFileName = rBaseName + '.csv';
    pngFileName = rBaseName + '.png';
    rScriptFileName = rBaseName + '.R';
    dendrogramLabel = `${rBaseName} - ${excludeType}`;
    console.log('end initForFileNameAndText');
  }

  function generateCSVFileNameAndText() {

    console.log('start generateCSVFileNameAndText');
    // add top row with ms descriptions
    let text = listForCSVFile + '\n';

    // now add percents
		for (var rowNum = 0; rowNum < numberMss; rowNum++) {

      let row = percents[rowNum];
     
      //console.log('row: ' + row);

      text += (row + '\n');
		}
    console.log('csv file text: ', text);
    let fileNameAndTextTuple = [ csvFileName, text ];
    return fileNameAndTextTuple;
  }

  function generateRScriptFileNameAndText() {
    
    let text =
    `hab <- read.csv("${csvFileName}", header = TRUE, sep=",")
    hc <- hclust(as.dist(100 - hab), method="${linkageMethod}")
    png("${pngFileName}",width=1600,height=1400,res=180,pointsize=12)
    plot(hc, xlab="Manuscript", ylab="Disagreement Scale", main="${dendrogramLabel}")
    dev.off( )`;

    console.log('r script file text: ', text);
    let fileNameAndTextTuple = [ rScriptFileName, text ];
    return fileNameAndTextTuple;
  }

  function getBookNameFromAbbr(abbr) {

    switch(abbr) {
      case 'oba':
        return 'Obadiah';
    }
    return 'cannot find';
  }

  function writeToRScripts(csvFileName, csvFileText, rScriptFileName, rScriptFileText, res) {
                  
    vars = [otBook, studyNo, new Date(), 'test description', excludeType, linkageMethod, csvFileName, csvFileText, rScriptFileName, rScriptFileText];                                   
    
    var rs = db
      .query(
        "insert into r_script (ot_book, study_no, date_created, description, exclude_type, linkage_method, csv_file_name, csv_file_text, rscript_file_name, rscript_file_text) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        vars
      )
      .then((data) => {
        console.log("percentagreements.js insert success: ", data, " results: ", data.results, " error: ", data.error);
        // res.send(data.results);
        // console.log("rs ", data);
        res.send({
          message: `percentagreements.js Inserted percent_agreement with ot_book=${o.ot_book} study_no=${o.study_no}.`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `percentagreements.js Error insert percent_agreement: ot_book: ${o.ot_book} study_no: ${o.study_no}`,
        });
      });
  }

} // end rScriptGenerator


/************************************************************* */

// function prelimDoGenerateRScripts(msDescriptions, res) {
    
//   var rs = db
//   .query(
//     `select ot_book, study_no, date_created, percentages_include_unique_readings from percent_agreement where ot_book = $1 and study_no = $2 order by ot_book, study_no`,
//     compositeKeyArray
//   )
//   .then((data) => {
//     // console.log("rs ", data);
//     //res.send(data.results);



    

//     var retVal = doGenerateRScripts(data, res);
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving one Witness.",
//     });
//   });
// }




// function doGenerateRScripts(data, res) {

//   let results = data.results[0];
//   //console.log('here results');
//   //console.log(results);

//   let otBook = results.ot_book;
//   let studyNo = results.study_no;
//   // don't use date_created from percent_agreement table 
  
//   let percents = results.percentages_include_unique_readings;
//   console.log('here percents');
//   console.log(percents);

//   console.log('**************************************************');

//   var fileText = generateRScriptHelper(otBook, studyNo, percents, res);
//   console.log('fileText in doGenerateRScripts: ');
//   console.log(fileText);
// }

// function generateRScriptHelper(otBook, studyNo, percents, res) {

// 	try {
// 		var rsg = new rScriptGenerator_Old(otBook, studyNo, percents, res);
// 		rsg.init();
// 		return rsg.generate();
// 	}
// 	catch(msg) {
// 		if (msg != null && msg != "") {
// 		  console.log('catch: ' + msg);
// 		}
// 	}
// }

// function rScriptGenerator_Old(otBookParam, studyNoParam, percentsParam, res) {

// 	console.log("percentsParam: " + percentsParam);
	
// 	// variables
// 	var otBook = otBookParam;
// 	var studyNo = studyNoParam;
// 	var percents = percentsParam;

// 	//var numberTVUs = null;
// 	var numberMss = null; // need this?
	
// 	this.init = function() {

// 		numberMss = percents.length;
//     console.log('numberMss: ', numberMss);	
// 	}

// 	this.generate = function() {

//     let percentsFileText = generatePercentsFileText();

//     let rScriptFileText = generateRScriptFileText();

//     writeToRScripts(percentsFileText, rScriptFileText, res);

// 		return percentsFileText; // TODO what to return?
// 	}

  // function generatePercentsFileText() {

  //   let percentsFileText = getPercentsHeader();
  //   percentsFileText += '\n';

	// 	for (var rowNum = 0; rowNum < numberMss; rowNum++) {

  //     let row = percents[rowNum];
     
  //     console.log('row: ' + row);

  //     percentsFileText += row;
  //     percentsFileText += '\n';
	// 	}
  //   percentsFileText = percentsFileText;
  //   return percentsFileText;
  // }

 

  // function getBookNameFromAbbr(abbr) {

  //   switch(abbr) {
  //     case 'oba':
  //       return 'Obadiah';
  //   }
  //   return 'cannot find';
  // }

  
//}

// Find a single generaterscripts with an id
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

  // generaterscripts.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving generaterscripts with id=" + id,
  //     });
  //   });
};

// Update a generaterscripts by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // generaterscripts.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "generaterscripts was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update generaterscripts with id=${id}. Maybe generaterscripts was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating generaterscripts with id=" + id,
  //     });
  //   });
};

// Delete a generaterscripts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // generaterscripts.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "generaterscripts was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete generaterscripts with id=${id}. Maybe generaterscripts was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete generaterscripts with id=" + id,
  //     });
  //   });
};

// Delete all generaterscripts from the database.
exports.deleteAll = (req, res) => {
  // generaterscripts.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} generaterscripts were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all generaterscripts.",
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