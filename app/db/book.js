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
    u.log(3,"book.js findAll...");
    var rs = await db.query(
	    `select id, book, witness, w, verses, ones from dots order by book, witness limit 2`
    )
    u.log(4,`  book findAll  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findOne = async (book) => {
    u.log(3,"book.js findOne... book: ${book}");
    var sql = 'select id, book, witness, w, verses, ones from dots where book = $1 order by book, witness limit 3'
    var rs = await db.query(
	sql, [book]
    )
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}
