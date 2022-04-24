const db = require("../db");
const u = require("../util/utils");

exports.findDistinct = async () => {
    u.log(3,"/db/book.js findDistinct...");
    let sql = 'select distinct book_id from book_study order by book_id'
    var rows = ''
    var message = ''
    try {
	var rs = await db.query( sql, null )
	u.log(4,`  db/book findDistinct  data: ${JSON.stringify(rs)}`);
	rows = rs.rows
	return {"msg": message, "rows": rows};
    } catch (e) {
	rows = []
	message = `ERROR in book.js.findDistinct: ${e}`
	return {"msg": message, "rows": rows};
    }
}

exports.findAll = async () => {
    u.log(3,"/db/book.js findAll...");
    // let sql = 'select book, study_no, description, date_created, mss_used from book_study order by book, study_no'
    let sql = 'select id, name from book order by id, book'
    var rs = await db.query( sql, null )
    u.log(4,`  db/book findAll  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findOne = async (book) => {
    u.log(3,`book.js findOne... book: ${book}`);
    let sql = 'select id, name from book order by id'
    var rs = await db.query(sql, [book])
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.findStudies = async (book) => {
    u.log(3,"book.js findStudies... book: ${book}");
    let sql = 'select book_id, study_no, description, date_created, mss_used, tvus, google_ss_url from book_study where book_id = $1 order by book_id, study_no'
    var rs = await db.query(sql, [book])
    u.log(4,`  book findOne  sql: ${sql}`);
    u.log(4,`  book findOne  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}

exports.addStudy = async (bookname) => {
    u.log(3,`book.js addStudy... bookname: ${bookname}`);
    let sql = 'insert into book_study (book_id, study_no, description, date_created, google_ss_url, mss_used, tvus) values ($1, $2, $3, $4, $5, $6, $7) returning *'
    var args = [bookname, 1, `Inserted as a study just for ${bookname}`, '2022/01/02', 'http://acu.edu', '{mss1, mss2, mss3}', '{v1, v2, v3}']
    var rs = await db.query(sql, args);
    return {"msg": "", "rs": rs};	    
}


exports.add = async (id, bookname) => {
    u.log(3,`book.js add... id: ${id} bookname: ${bookname}`);
    let sql = 'insert into book (id, name ) values ($1, $2) returning *'
    var rs = await db.query(sql, [id, bookname]);
    return {"msg": "", "rs": rs};	    
}

exports.findStudy = async (book, study) => {
    u.log(3, `book.js findStudy ... book: ${book} study: ${study}`);
    let sql = 'select book_id, study_no, description, date_created, mss_used from book_study where book_id = $1 and study_no = $2 order by book_id, study_no';
    var rs = await db.query(sql, [book, study])
    u.log(4,`  book findStudy  sql: ${sql}`);
    u.log(4,`  book findStudy  data: ${JSON.stringify(rs)}`);
    return {"msg": "", "rows": rs.rows};
}
