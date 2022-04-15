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
exports.findAll = async () => {
    u.log(3,"/db/book.js findAll...");
    let sql = 'select ot_book, study_no, description, date_created, mss_used from ot_book_study order by ot_book, study_no'
    var rs = await db.query( sql, null )
    u.log(4,`  db/book findAll  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findOne = async (book) => {
    u.log(3,"book.js findOne... book: ${book}");
    let sql = 'select ot_book, study_no, description, date_created, mss_used from ot_book_study where ot_book = $1 order by ot_book, study_no'
    var rs = await db.query(sql, [book])
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}
