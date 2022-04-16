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
  console.log("calculatepercents.controller create");
  
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
      console.log("calculatepercents.js insert success: ", data, " results: ", data.results, " error: ", data.error);
      // res.send(data.results);
      // console.log("rs ", data);
      res.send({
        message: `calculatepercents.js Inserted percent_agreement with ot_book=${o.ot_book} study_no=${o.study_no}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `calculatepercents.js Error insert percent_agreement: ot_book: ${o.ot_book} study_no: ${o.study_no}`,
      });
    });
};

// Retrieve all calculatepercents from the database.
exports.findAll = (req, res) => {
  console.log("  in findAll for calculatepercents");
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
        message: err.message || "Some error occurred while retrieving calculatepercents.",
      });
    });
};

exports.findCalculatePercent = (req, res) => {

  const calculatepercent = req.params.calculatepercent || null;
  console.log("in findCalculatePercent", calculatepercent);

  let vars = null;
  if (calculatepercent === null) {
    res.send({ message: "Sorry, calculatepercent was null." });
    return;
  }

  // calculatepercent is in format {ot_book}-{study_no}
  // example 'oba-2'
  var compositKeyArray = calculatepercent.split('-');

  //vars = [calculatepercent];

  var rs = db
    .query(
      `select ot_book, study_no, date_created, variants from variants_set where ot_book = $1 tand study_no = $2 order by ot_book, study_no`,
      compositKeyArray
    )
    .then((data) => {
      console.log("here is data: ", data);
      //res.send(data.results);

      var retVal = doCalculatePercents(data, res);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving one Witness.",
      });
    });
};


function doCalculatePercents(data, res) {

  let results = data.results[0];
  //console.log('here results');
  //console.log(results);

  let otBook = results.ot_book;
  let studyNo = results.study_no;
  // don't use date_created from percent_agreement table 
  
  let variants = results.variants;
  console.log('here variants');
  console.log(variants);

  console.log('**************************************************');


  // got it!
  var ratios = calculatePercentHelper(otBook, studyNo, variants, res);
  console.log('ratios in doCalculatePercents: ');
  console.log(ratios);



}


function calculatePercentHelper(otBook, studyNo, variants, res) {

	try {
		var pc = new percentCalculator(otBook, studyNo, variants, res);
		pc.init();
		return pc.calculate();
	}
	catch(msg) {
		if (msg != null && msg != "") {
		  console.log('catch: ' + msg);
		}
	}
}

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);



function percentCalculator(otBookParam, studyNoParam, variantsParam, res) {

	console.log("variantsParam: " + variantsParam);
	


	// variables
	var otBook = otBookParam;
	var studyNo = studyNoParam;
	var variants = variantsParam;

	var numberTVUs = null;
	var numberMss = null;

	var outputRatiosArray_includeUniqueReadings = new Array();
	var outputRatiosArray_excludeUniquePlusses = new Array();
	var outputRatiosArray_excludeUniqueReadings = new Array();

  var outputPercentsArray_includeUniqueReadings = new Array();
	var outputPercentsArray_excludeUniquePlusses = new Array();
	var outputPercentsArray_excludeUniqueReadings = new Array();

	var tvuIndexArray_excludeUniquePlusses = new Array();
	var tvuIndexArray_excludeUniqueReadings = new Array();


	//var includeUniqueReadings = null; // set to true or false
	
	this.init = function() {

		numberTVUs = variants.length;
		numberMss = variants[0].length; // all TVUs have same number of mss

    for (var i = 0; i < numberMss; i++) {
			outputRatiosArray_includeUniqueReadings[i] = new Array();
			outputRatiosArray_excludeUniquePlusses[i] = new Array();
			outputRatiosArray_excludeUniqueReadings[i] = new Array();

      outputPercentsArray_includeUniqueReadings[i] = new Array();
			outputPercentsArray_excludeUniquePlusses[i] = new Array();
			outputPercentsArray_excludeUniqueReadings[i] = new Array();
    }

		for (var i = 0; i < numberTVUs; i++) {
		
			var variantsRow = variants[i];
			var numZerosThisRow = countOccurrences(variantsRow, 0);
			var numOnesThisRow = countOccurrences(variantsRow, 1);
			var numTwosThisRow = countOccurrences(variantsRow, 2);

			if (numZerosThisRow + numOnesThisRow + numTwosThisRow != numberMss) {
				throw 'total count incorrect';
			}

			if (numOnesThisRow == 0 && numTwosThisRow == 0) {
				// hmm... only zeros
				throw 'All zeros';
			}
			else if (numTwosThisRow == 1) {
				// unique plus
				tvuIndexArray_excludeUniquePlusses.push(i)
				tvuIndexArray_excludeUniqueReadings.push(i);
			}
			else if (numOnesThisRow == 1) {
				// unique minus
				tvuIndexArray_excludeUniqueReadings.push(i);
			}
			// else mixed ones and twos, don't do anything
		}
		//alert('unique plusses: ' + tvuIndexArray_excludeUniquePlusses);
		//alert('unique readings: ' + tvuIndexArray_excludeUniqueReadings);
	}

	this.calculate = function() {

    // for each row and each column, calculate ratios and percents and stuff them into output cells
		for (var outputRowNum = 0; outputRowNum < numberMss; outputRowNum++) {
			// TODO don't do following row since we are doing ratios and not 
      outputRatiosArray_includeUniqueReadings[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself
      outputRatiosArray_excludeUniquePlusses[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself
      outputRatiosArray_excludeUniqueReadings[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself

      // TODO don't do following row since we are doing ratios and not 
      outputPercentsArray_includeUniqueReadings[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself
      outputPercentsArray_excludeUniquePlusses[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself
      outputPercentsArray_excludeUniqueReadings[outputRowNum][outputRowNum] = 100; // write 100 to intersections, because each ms agrees 100% with itself
			for (var outputColNum = outputRowNum + 1; outputColNum < numberMss; outputColNum++) {

        // no exclude index for this one
        setValues(outputRowNum, outputColNum, outputRatiosArray_includeUniqueReadings, outputPercentsArray_includeUniqueReadings, null);

        setValues(outputRowNum, outputColNum, outputRatiosArray_excludeUniquePlusses, outputPercentsArray_excludeUniquePlusses, tvuIndexArray_excludeUniquePlusses);

        setValues(outputRowNum, outputColNum, outputRatiosArray_excludeUniqueReadings, outputPercentsArray_excludeUniqueReadings, tvuIndexArray_excludeUniqueReadings);


			  // var ratio_include = ratioAgreementColumns(outputRowNum, outputColNum, null);
			  // outputRatiosArray_includeUniqueReadings[outputRowNum][outputColNum] = ratio_include;
			  // // do the flip side
			  // outputRatiosArray_includeUniqueReadings[outputColNum][outputRowNum] = ratio_include;

			  // var ratio_excludeUniquePlusses = ratioAgreementColumns(outputRowNum, outputColNum, tvuIndexArray_excludeUniquePlusses);
			  // outputRatiosArray_excludeUniquePlusses[outputRowNum][outputColNum] = ratio_excludeUniquePlusses;
			  // // do the flip side
			  // outputRatiosArray_excludeUniquePlusses[outputColNum][outputRowNum] = ratio_excludeUniquePlusses;

			  // var ratio_excludeUniqueReadings = ratioAgreementColumns(outputRowNum, outputColNum, tvuIndexArray_excludeUniqueReadings);
			  // outputRatiosArray_excludeUniqueReadings[outputRowNum][outputColNum] = ratio_excludeUniqueReadings;
			  // // do the flip side
			  // outputRatiosArray_excludeUniqueReadings[outputColNum][outputRowNum] = ratio_excludeUniqueReadings; 
			}  
		}

    writeToPercentAgreements(outputRatiosArray_includeUniqueReadings, outputPercentsArray_includeUniqueReadings,
                             outputRatiosArray_excludeUniquePlusses, outputPercentsArray_excludeUniquePlusses,
                             outputRatiosArray_excludeUniqueReadings, outputPercentsArray_excludeUniqueReadings, res);

    // TODO here write to percent_agreement table
		   
		// alert('end of calculate()');
		// alert('outputRatiosArray_includeUniqueReadings: ' + outputRatiosArray_includeUniqueReadings);
		// alert('outputRatiosArray_excludeUniquePlusses: ' + outputRatiosArray_excludeUniquePlusses);
		// alert('outputRatiosArray_excludeUniqueReadings: ' + outputRatiosArray_excludeUniqueReadings);
		return outputRatiosArray_includeUniqueReadings;
	}

  function getPercent(ratio) {
    
    let ratioSplitArray = ratio.split('/');
    let percent = null;
    if (ratioSplitArray.length != 2) {
      percent = 100;
    }
    else {
      let numerator = ratioSplitArray[0].trim();
      let denominator = ratioSplitArray[1].trim();

      if (denominator == 0) {
        percent = 0;
      }
      else {
        percent = numerator / denominator * 100;
      }
    }
    //alert(percent);
    return percent;
  }

  function setValues(row, col, outputRatiosArray, outputPercentsArray, excludeIndex) {

    let ratio = ratioAgreementColumns(row, col, excludeIndex);
    outputRatiosArray[row][col] = ratio;
    // do the flip side
    outputRatiosArray[col][row] = ratio;

    let percent = getPercent(ratio);
    outputPercentsArray[row][col] = percent;
    // do the flip side
    outputPercentsArray[col][row] = percent;
  }

	function ratioAgreementColumns(col1, col2, excludeIndexArray) {
   
		var numSame = 0;    // numerator for percentage calculation
		var numNotZero = 0; // denominator for percentage calculation
		
		for (var row = 0; row < numberTVUs; row++)
		{
		  if (includeThisRow(row, excludeIndexArray)) {
			var val1 = variants[row][col1];
			var val2 = variants[row][col2];
			if (isOK(val1) && isOK(val2)) {
			  numNotZero++;
			  if (val1 == val2) {
				numSame++;
			  }
			}
		  }
		}
		//alert('numSame: ' + numSame);
		//alert('numNotZero: ' + numNotZero);
		
		if (numNotZero == 0) {
		  return "no data";
		}
		else {
		  return (numSame + " / " + numNotZero);
		}
	}

	function includeThisRow(row, excludeIndexArray) {

		var include = true;
		// do not include it if row is in index array
		if (excludeIndexArray != null) {
			include = (excludeIndexArray.indexOf(row) == -1);
		}
		return include;
	}

	function isOK(val) {
		if ((typeof val != "number") || (val == 0)) {
		  return false;
		}
		else {
		  return true;
		}
	}

  function  writeToPercentAgreements(
    ratiosIncludeUnique, percentsIncludeUnique,
    ratiosExcludePlusses, percentsExcludePlusses,
    ratiosExclude, percentsExclude, res) {
                  
    vars = [otBook, studyNo, new Date(),
              ratiosIncludeUnique, percentsIncludeUnique,
              ratiosExcludePlusses, percentsExcludePlusses,
              ratiosExclude, percentsExclude];                                   
    
    var rs = db
      .query(
        "insert into percent_agreement (ot_book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
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
}

// Find a single calculatepercents with an id
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

  // calculatepercents.findByPk(id)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving calculatepercents with id=" + id,
  //     });
  //   });
};

// Update a calculatepercents by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // calculatepercents.update(req.body, {
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "calculatepercents was updated successfully.",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update calculatepercents with id=${id}. Maybe calculatepercents was not found or req.body is empty!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating calculatepercents with id=" + id,
  //     });
  //   });
};

// Delete a calculatepercents with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  // calculatepercents.destroy({
  //   where: { id: id },
  // })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "calculatepercents was deleted successfully!",
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot delete calculatepercents with id=${id}. Maybe calculatepercents was not found!`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Could not delete calculatepercents with id=" + id,
  //     });
  //   });
};

// Delete all calculatepercents from the database.
exports.deleteAll = (req, res) => {
  // calculatepercents.destroy({
  //   where: {},
  //   truncate: false,
  // })
  //   .then((nums) => {
  //     res.send({ message: `${nums} calculatepercents were deleted successfully!` });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while removing all calculatepercents.",
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
