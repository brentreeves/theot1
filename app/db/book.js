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

exports.findDistinct = async () => {
    u.log(3,"/db/book.js findAll...");
    let sql = 'select distinct book from book_study order by book'
    var rs = await db.query( sql, null )
    u.log(4,`  db/book findDistinct  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findAll = async () => {
    u.log(3,"/db/book.js findAll...");
    let sql = 'select book, study_no, description, date_created, mss_used from book_study order by book, study_no'
    var rs = await db.query( sql, null )
    u.log(4,`  db/book findAll  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findOne = async (book) => {
    u.log(3,"book.js findOne... book: ${book}");
    let sql = 'select book, study_no, description, date_created, mss_used from book_study where book = $1 order by book, study_no'
    var rs = await db.query(sql, [book])
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findStudy = async (book, study) => {
    u.log(3, `book.js findStudy ... book: ${book} study: ${study}`);
    let sql = 'select book, study_no, description, date_created, mss_used from book_study where book = $1 and study_no = $2 order by book, study_no';
    var rs = await db.query(sql, [book, study])
    u.log(4,`  book findStudy  sql: ${sql}`);
    u.log(4,`  book findStudy  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}
