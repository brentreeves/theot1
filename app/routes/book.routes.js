const u = require("../util/utils")

module.exports = function(app) {
    u.log(1,'book.routes.js ...');
    
    const book = require("../db/book.js");
    const percent = require("../db/percent.js");
    const variant = require("../db/variants.js");
    var router = require("express").Router();

    // ??
    // app.use(function (req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    //   res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    //   );
    //   res.header("Access-Control-Allow-Methods", "GET");
    //   next();
    // });

    router.get("/:book/study/:study/calculate", async (req,res) => {
	let abook = req.params.book
	let astudy = req.params.study
	u.log(3,`book.routes  /:book ${abook} /:study ${astudy} calculate`)

// select b.book, b.study_no, v.variants from book_study b inner join variants_set v on (b.book = v.book and b.study_no = v.study_no) where b.book = 'bnr';


	let matrix = await variant.calculateOne(abook, astudy)
	u.log(3,`book.routes /:book/study:study calculate: ${JSON.stringify(matrix)}`)

	res.render('pages/calculated.ejs', {"data" : matrix, "book": abook, "study": astudy, });
    });


    router.get("/:book/study/:study/percent", async (req,res) => {
	let abook = req.params.book
	let astudy = req.params.study
	u.log(3,`book.routes  /:book ${abook} /:study ${astudy} percent`)

	let rs = await percent.findOne(abook, astudy)
	u.log(3,`book.routes /:book/study:study rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes /:book/study:study rows: ${JSON.stringify(rs.rows)}`)
	u.log(3,`book.routes /:book/study:study rows[0]: ${JSON.stringify(rs.rows[0])}`)

	// let headers = []
	// if (rs.rows.length > 0)
	//     headers = rs.rows[0].verses
	res.render('pages/percent.ejs', {"percent" : rs.rows[0], "book": abook, "studyno": astudy});
    });

    router.get("/:book/study/:study", async (req,res) => {
	let abook = req.params.book
	let astudy = req.params.study
	u.log(3,`book.routes  /:book ${abook} /:study ${astudy}`)
	let rs = await book.findStudy(abook, astudy)
	u.log(3,`book.routes /:book/study:study rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes /:book/study:study rows: ${JSON.stringify(rs.rows)}`)
	u.log(3,`book.routes /:book/study:study rows[0]: ${JSON.stringify(rs.rows[0])}`)

	// let headers = []
	// if (rs.rows.length > 0)
	//     headers = rs.rows[0].verses
	res.render('pages/study.ejs', {"study" : rs.rows[0], "book": abook, "studyno": astudy});
    });

    router.get("/:book", async (req,res) => {
	let abook = req.params.book
	u.log(3,`book.routes /:book ${abook}`)
	let rs = await book.findOne(abook)

	u.log(3,`book.routes /:book rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes /:book rows: ${JSON.stringify(rs.rows)}`)
	let headers = []
	if (rs.rows.length > 0)
	    headers = rs.rows[0].verses
	res.render('pages/book.ejs', {"rows" : rs.rows, "book": abook});
    });

    router.get("/", async (req,res) => {
	var rs = await book.findDistinct()
	u.log(3,`book.routes ! / rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes ! / rows: ${JSON.stringify(rs.rows)}`)
	let headers = []
	if (rs.rows.length > 0)
	    headers = rs.rows[0].verses
	res.render('pages/books.ejs', {"rows" : rs.rows});
    })

    app.use("/book", router);
};
