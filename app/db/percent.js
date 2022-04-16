const db = require("../db");
const u = require("../util/utils");

/*
{command: "SELECT",
 rowCount: 42,
 oid: null,
 rows: [],
 fields: [],
 _parsers: [],
 _types: {},
 RowCtor: null,
 rowsAsArray: false
*/


exports.findOne = async (book, study) => {
    u.log(3,"book.js findOne... book: ${book} study: ${study}");
    let sql = 'select ot_book, study_no, date_created, ratios_include_unique_readings, ratios_exclude_unique_readings, ratios_exclude_unique_plusses, percentages_include_unique_readings, percentages_exclude_unique_readings, percentages_exclude_unique_plusses from percent_agreement where ot_book = $1 and study_no = $2 order by ot_book, study_no'
    var rs = await db.query(sql, [book, study])
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows, "study": study, "book": book};
}

