const db = require("../db");
const u = require("../util/utils");

exports.insertPercents = async (book, study, date, riu, piu, rep, pep, re, pe) => {
    u.log(3,`variants.js insertPercents... book: ${book} study: ${study}`);
    let sql = "insert into percent_agreement (ot_book, study_no, date_created, ratios_include_unique_readings, percentages_include_unique_readings, ratios_exclude_unique_plusses, percentages_exclude_unique_plusses, ratios_exclude_unique_readings, percentages_exclude_unique_readings) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *";
    var rs = await db.query(db, [book, study, date, riu, piu, rep, pep, re, pe])
    u.log(1,`percent.js insertPercents returning: ${JSON.stringify(rs)}`)
    return {"msg": "", "rows": rs.rows}
}

exports.calculateOne = async (book, study) => {
    u.log(3,`variants.js calculateOne... book: ${book} study: ${study}`);
    let sql = 'select ot_book, study_no, date_created, variants from variants_set where ot_book = $1 and study_no = $2 order by ot_book, study_no'
    var rs = await db.query( sql, [book, study]);
    u.log(3,`\ncalculateOne sofar: ${JSON.stringify(rs.rows[0].variants.length)}\n`)

    var cp = calculatePercents(book, study, rs.rows[0].variants);
    u.log(3,`calculateOne returning: ${JSON.stringify(cp)}`)
    return cp
}

// ------------------------------------------------------------------
// in: 1 row from variants_set: book, study, [][] witness/tvu 1s-2s
// out: similarity matrix
// side-effects: inserts row in to 
//
calculatePercents = (book, study, variants) => {
    // don't use date_created from percent_agreement table ??
    u.log(3,`calculatePercents() book ${book} study ${study} variants: ${variants[3]}`)
    try {
	var pc = new percentCalculator(book, study, variants);
	pc.init();

	let rr = pc.calculate();
	u.log(2,`calculatePercents returning: ${JSON.stringify(rr)}`)
	return rr
    }
    catch(msg) {
	u.log(-1,`ERROR doCalculatePercents msg: ${msg}`)
	return {"msg" : msg.message}
    }
}

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function percentCalculator(otBookParam, studyNoParam, variantsParam) {
    u.log(1, `percentCalculator  variants: ${variantsParam.length}`);

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

	//bnr return instead
	// writeToPercentAgreements(outputRatiosArray_includeUniqueReadings, outputPercentsArray_includeUniqueReadings,
	// 			 outputRatiosArray_excludeUniquePlusses, outputPercentsArray_excludeUniquePlusses,
	// 			 outputRatiosArray_excludeUniqueReadings, outputPercentsArray_excludeUniqueReadings);

	// TODO here write to percent_agreement table
	
	// alert('end of calculate()');
	// alert('outputRatiosArray_includeUniqueReadings: ' + outputRatiosArray_includeUniqueReadings);
	// alert('outputRatiosArray_excludeUniquePlusses: ' + outputRatiosArray_excludeUniquePlusses);
	// alert('outputRatiosArray_excludeUniqueReadings: ' + outputRatiosArray_excludeUniqueReadings);

	// return outputRatiosArray_includeUniqueReadings;

	return
	[outputRatiosArray_includeUniqueReadings,
	 outputPercentsArray_includeUniqueReadings,
	 outputRatiosArray_excludeUniquePlusses,
	 outputPercentsArray_excludeUniquePlusses,
	 outputRatiosArray_excludeUniqueReadings,
	 outputPercentsArray_excludeUniqueReadings];
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

    async function writeToPercentAgreements(ratiosIncludeUnique, percentsIncludeUnique,
					    ratiosExcludePlusses, percentsExcludePlusses,
					    ratiosExclude, percentsExclude) {
        
	var rs = await insertPercents(otBook, studyNo, new Date(),
			      ratiosIncludeUnique, percentsIncludeUnique,
			      ratiosExcludePlusses, percentsExcludePlusses,
				      ratiosExclude, percentsExclude);
	
	u.log(1,`percent.js writeToPercentAgreements rs: ${JS.stringify(rs)},  results: ${JSON.stringify(data.results)}, error: ${rs.error}`);
	return rs;
    }
}

