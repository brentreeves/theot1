// ratio/percentage agreement matrix
const u = require("./utils.js")

function displayAll() { return this + ""; }
function displayPcnt() { return this.split(" ")[1]; }
function displayRatio() { return this.split(" ")[2]; }

//
// transpose a matrix from rows x cols to cols x rows
//
function transpose(ones) {
    u.log(1, `transpose ones: ${JSON.stringify(ones)}`)
    let cols = ones.length
    let rows = ones[0].length
    u.log(1, `rows: ${rows} cols: ${cols}`)
    let matrix = new Array(rows)
    for (var i = 0; i < rows; i++)
	matrix[i] = new Array(cols)

    // console.log('matrix: ', matrix)
    
    for (var i = 0; i < cols; i++) {
	for (var j = 0; j < rows; j++) {
	    //   console.log(`  [${i}][${j}]: ${ones[i][j]} => matrix [${j}][${i}]`)
	    matrix[j][i] = ones[i][j]
	}
    }
    u.log(1,`transpose returns: ${JSON.stringify(matrix)}`)
    return matrix
}

// var m = [[2,1,2], [2,1,2], [2,2,2], [2,2,1]]
// console.log(m)
// var m2 = transpose( m )
// console.log(  m2 )

//
// matrix input: [
//     ["wit1","wit1 1.000 4/4","wit2 0.500 2/4","wit3 0.750 3/4"],
//     ["wit2",                 "wit2 1.000 4/4","wit3 0.250 1/4"],
//     ["wit3",                                  "wit3 1.000 4/4"]]
//
// extracts either the % or the fraction part and fills out matrix
// matrix return:
// [
//     ["percent","wit1 1.000 4/4","wit2 0.500 2/4","wit3 0.750 3/4"],
//     ["wit1","1.000","0.500","0.750"],
//     ["wit2","0.500","1.000","0.250"],
//     ["wit3","0.750","0.250","1.000"]]


function matrix(title, rows, display = 'percent') {
    // matrix("All", ratiosAll, displayAll);
    // matrix("Ratio", ratiosAll, displayRatio);
    var aRow;
    u.log(2, `matrix input: ${JSON.stringify(rows)}`)
    // console.log(" ");
    let mm = [];
    let fDisplay = (display === 'percent' ? displayPcnt : displayRatio);

    // console.log(rows[0].join(", "));
    // extract mss names from first row
    aRow = rows[0]
    let titles = []
    for (var i = 0; i < aRow.length; i++) {
	titles.push( aRow[i].split(" ")[0] )
    }
	
    // mm.push(rows[0]);
    mm.push(titles);

    for (var i = 0; i < rows.length; i++) {
        aRow = rows[i];

        var vs = aRow.slice(1, aRow.length);
        vs.sort();
        //
        // important -  must sort columns first...

        var keepers = vs.map((item) => fDisplay.apply(item));
        // var aline = keepers.join(",");
        //
        // right align matrix
        //
        // var prefix = ",".repeat(i + 1);
        let prefix = new Array(i + 1);
        prefix[0] = aRow[0];

        let row = prefix.concat(keepers);
        // process.stdout.write(aRow[0] + prefix);
        mm.push(row);
    }
    // now transpose/copy, given 1st column has labels
    for (var r = 2; r < mm.length; r++) {
        for (var c = 1; c <= r; c++) {
            mm[r][c] = mm[c][r]
        }
    }
    mm[0][0] = title;

    u.log(2, `matrix return: ${JSON.stringify(mm)}`)

    return mm;
}


// convert to ot_book_study
//
// dots:
//
// local_theot1=# select book, witness, array_length(ones,1), ones[0:9] from dots limit 4;
//  book |         witness          | array_length |        ones
// ------+--------------------------+--------------+---------------------
//  Oba  | EMIP1029MihGed54_15-16th |          540 | {1,2,2,1,2,2,2,1,1}
//  Oba  | EMIP2007Tweed58_18th     |          540 | {2,2,2,1,2,2,2,1,2}
//  Oba  | EMIP746ChelSel5_1719     |          540 | {1,2,2,1,2,2,2,1,2}
//  Oba  | EMIP881ChelSel142_17th   |          540 | {1,2,2,1,2,2,2,1,2}
// (4 rows)
//
//
// variants_set
//
// local_theot1=# select ot_book, study_no, array_length(variants,1), variants[0:5][0:5] from variants_set limit 4;
//  ot_book | study_no | array_length |                           variants
// ---------+----------+--------------+---------------------------------------------------------------
//  oba     |        1 |          540 | {{1,2,1,1,1},{2,2,2,2,2},{2,2,2,2,2},{1,1,1,1,1},{2,2,2,2,2}}
//  oba     |        2 |          540 | {{1,2,1,1,1},{2,2,2,2,2},{2,2,2,2,2},{1,1,1,1,1},{2,2,2,2,2}}
//  oba     |        3 |          540 | {{1,2,1,1,1},{2,2,2,2,2},{2,2,2,2,2},{1,1,1,1,1},{2,2,2,2,2}}
//  deu     |        3 |            4 | {{1,2},{2,0},{2,2},{1,1}}
// (4 rows)
//
// order in 'variants' column allegedly agrees with orders in ot_book_study: tvus x mss_used
//
// local_theot1=# select ot_book as book, study_no as st, array_length(mss_used,1) as n, mss_used[0:2], array_length(tvus,1) as tn, tvus[0:2], tvus[539:] from ot_book_study limit 4;
//  book | st | n  |      mss_used       | tn  |              tvus               |                 tvus
// ------+----+----+---------------------+-----+---------------------------------+---------------------------------------
//  oba  |  1 | 36 | {EMIP1029,EMIP2007} | 540 | {{1,1:01a_col1},{2,1:01a_col2}} | {{539,1:21b_col11},{540,1:21b_col12}}
//  oba  |  2 | 36 | {EMIP1029,EMIP2007} | 540 | {{1,1:01a_col1},{2,1:01a_col2}} | {{539,1:21b_col11},{540,1:21b_col12}}
//  oba  |  3 | 36 | {EMIP1029,EMIP2007} | 540 | {{1,1:01a_col1},{2,1:01a_col2}} | {{539,1:21b_col11},{540,1:21b_col12}}
//  oba  |  4 | 36 | {EMIP1029,EMIP2007} | 540 | {{1,1:01a_col1},{2,1:01a_col2}} | {{539,1:21b_col11},{540,1:21b_col12}}
// (4 rows)
//
// ot_book_study:
//

// export async function getOnesRatios(aBook) {
//   return query(
//     `select book, witness, w, array_length(ones,1) n, ones from dots where book = '${aBook}' order by book, w`,
//     "getVersesFromBook"
//   );
// }
//
// this input differs:
//   1 row per witness, each with 1s2s so... transposed and unarrayed
//
// 	tvu1	tvu2	tvu3	tvu4
// mss1	2	2	2	2
// mss2	1	1	2	2
// mss3	2	2	2	1
//
// {tvu1,tvu2,tvu3,tvu4}
// {mss1,mss2,mss3}
//
// transformed into garry's variants:
// tvu1 {2,1,2}
// tvu2 {2,1,2}
// tvu3 {2,2,2}
// tvu4 {2,2,1}
//
// {{2,1,2},{2,1,2},{2,2,2},{2,2,1}}
//

async function data_to_ratios_json(witnesses, tvus, variants, aView = 'percent') {
    // aView = [percent, ratio]
    /* ratios = new 2d array 
       query
       for each row N,
       for each row X of 0 to n-1
       calculate row X vs row N and append to ratios array

       {w1: "", w2: "", pcnt: "", ratio: ""}
    */
    //
    var wit_tvu = transpose(variants)
    u.log(2,`data_to_ratios_json variants: ${JSON.stringify(variants)}`)
    u.log(2,`                     wit_tvu: ${JSON.stringify(wit_tvu)}`)
    u.log(2,`                     witness: ${JSON.stringify(witnesses)}`)
    // 
    // var rows = Object.values(variants);

    var nrows = wit_tvu.length
    var i = 0;
    var j = 0;
    var k = 0;

    var ratiosAll = [];
    var ratios = [];
    var t_ratio = "";
    var row1 = [];
    var row1_ones = [];
    var row1_ones_count = 0;
    var row1_witness = ''
    var row2 = [];
    var row2_ones = [];
    var row2_ones_count = 0;
    var row2_witness = ''

    var match = 0;

    //    u.log(1, `data_to_ratios_json Book: ${rows[0].book}`);
    for (var i = 0; i < nrows; i++) {
        // row1 = wit_tvu[i]; // ?
	row1_witness = witnesses[i]
        row1_ones = wit_tvu[i];
        row1_ones_count = row1_ones.length;

        u.log(2, `\nRow I:  ${i} row1_ones: ${row1_ones}`)

        // ratios = [row1.w + "_" + row1.witness];

        ratios = [ witnesses[i] ]
        // for (j = i + 1; j < nrows; j++) {
        for (var j = i; j < nrows; j++) {
            // row2 = wit_tvu[j]; // ?? 
	    row2_witness = witnesses[j]
            row2_ones = wit_tvu[j]; 
            row2_ones_count = row2_ones.length;

            u.log(2, `\nRow J:  ${j} row2_ones: ${row2_ones}`)
            u.log(2, ` Row J: witness ${witnesses[j]}`)
            var row1_nonzero = 0;
            var row2_nonzero = 0;

            // if n012a != n012b then we have bigger problems
            //
            match = 0;
            for (k = 0; k < row2_ones_count; k++) {

                if (row1_ones[k] != 0 && row2_ones[k] != 0) {
                    row1_nonzero += 1;
                    row2_nonzero += 1;
                }

                // if ( row1_ones[k] != 0 )
                // 	row1_nonzero += 1

                // if ( row2_ones[k] != 0 )
                // 	row2_nonzero += 1

                if (row1_ones[k] == 0) continue;

                if (row2_ones[k] == 0) continue;

                if (row1_ones[k] == row2_ones[k]) match += 1;
            }
            // console.log("compared ", row1.witness, row1_nonzero, row2.witness, row2_nonzero, match)
            var damin = Math.min(row1_nonzero, row2_nonzero);
            t_ratio = (match / damin).toFixed(3) + " " + match + "/" + damin;

            // ratios.push(row1.witness + "_(" + row1_nonzero + ") v " + row2.witness + "_(" + row2_nonzero + ") " +  t_ratio)
            // ratios.push(row2.witness + "_(" + row2_nonzero + ") " +  t_ratio)

            // W1 numbers for now?
            // ratios.push(row2.w + "_" + row2.witness + " " + t_ratio);
            ratios.push(row2_witness + " " + t_ratio);
            u.log(3,` witness1 ${row1_witness} witness2 ${row2_witness} ratio: ${t_ratio}`);
        }
        ratiosAll.push(ratios);
        ratios = [];
    }

    u.log(3,`\n  view: ${aView} ratiosAll: ${JSON.stringify(ratiosAll)}` )
    u.log(3,`\n  view: ${aView} ratiosAll: ${ratiosAll}` )
    //
    // now produce "triangle" x vs y ratio matrix
    //

    return matrix(aView, ratiosAll, aView);
}

module.exports = {
    displayAll,
    displayPcnt,
    displayRatio,
    data_to_ratios_json,
    matrix,
    transpose
}


// export async function old_data_to_ratios_json(rows, aView = 'percent') {
//     // aView = [percent, ratio]
//     /* ratios = new 2d array 
//        query
//        for each row N,
//        for each row X of 0 to n-1
//        calculate row X vs row N and append to ratios array
//        {w1: "", w2: "", pcnt: "", ratio: ""}
//     */
//     var rows = Object.values(rows);
//     var nrows = rows.length;
//     var i = 0;
//     var j = 0;
//     var k = 0;
//     var ratiosAll = [];
//     var ratios = [];
//     var t_ratio = "";
//     var row1 = [];
//     var row1_ones = [];
//     var row1_ones_count = 0;
//     var row2 = [];
//     var row2_ones = [];
//     var row2_ones_count = 0;
//     var match = 0;
//     // console.log('Book', rows[0].book);
//     for (var i = 0; i < nrows; i++) {
//         row1 = rows[i];
//         row1_ones = row1.ones;
//         row1_ones_count = row1_ones.length;
//         // console.log("\nRow: " + row1.witness)
//         ratios = [row1.w + "_" + row1.witness];
//         // for (j = i + 1; j < nrows; j++) {
//         for (var j = i; j < nrows; j++) {
//             row2 = rows[j];
//             row2_ones = row2.ones;
//             row2_ones_count = row2_ones.length;
//
//             // console.log(" v Row: " + row2.witness)
//             var row1_nonzero = 0;
//             var row2_nonzero = 0;
//
//             // if n012a != n012b then we have bigger problems
//             //
//             match = 0;
//             for (k = 0; k < row2_ones_count; k++) {
//                 if (row1_ones[k] != 0 && row2_ones[k] != 0) {
//                     row1_nonzero += 1;
//                     row2_nonzero += 1;
//                 }
//
//                 // if ( row1_ones[k] != 0 )
//                 // 	row1_nonzero += 1
//
//                 // if ( row2_ones[k] != 0 )
//                 // 	row2_nonzero += 1
//
//                 if (row1_ones[k] == 0) continue;
//
//                 if (row2_ones[k] == 0) continue;
//
//                 if (row1_ones[k] == row2_ones[k]) match += 1;
//             }
//             // console.log("compared ", row1.witness, row1_nonzero, row2.witness, row2_nonzero, match)
//             var damin = Math.min(row1_nonzero, row2_nonzero);
//             t_ratio = (match / damin).toFixed(3) + " " + match + "/" + damin;
//
//             // ratios.push(row1.witness + "_(" + row1_nonzero + ") v " + row2.witness + "_(" + row2_nonzero + ") " +  t_ratio)
//             // ratios.push(row2.witness + "_(" + row2_nonzero + ") " +  t_ratio)
//
//             // W1 numbers for now?
//             ratios.push(row2.w + "_" + row2.witness + " " + t_ratio);
//             // console.log(
//             //     row1.w + "_" + row1.witness,
//             //     row2.w + "_" + row2.witness,
//             //     t_ratio
//             // );
//         }
//         ratiosAll.push(ratios);
//         ratios = [];
//     }
//
//     //
//     // now produce "triangle" x vs y ratio matrix
//     //
//
//     return matrix(aView, ratiosAll, aView);
// }
