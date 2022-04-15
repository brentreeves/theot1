const u = require("../util/utils")

module.exports = function(app) {
    u.log(1,'book.routes.js !! ...');
    
    const book = require("../db/book.js");
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

    router.get("/:book", async (req,res) => {
	let abook = req.params.book
	u.log(3,`book.routes ! /:book ${abook}`)
	let rs = await book.findOne(abook)

	u.log(3,`book.routes /:book rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes /:book rows: ${JSON.stringify(rs.rows)}`)
	let headers = []
	if (rs.rows.length > 0)
	    headers = rs.rows[0].verses
	res.render('pages/book.ejs', {"rows" : rs.rows, "cols" : headers, "book": abook});
    });

    router.get("/", async (req,res) => {
	var rs = await book.findAll()
	u.log(3,`book.routes ! / rs: ${JSON.stringify(rs)}`)
	u.log(3,`book.routes ! / rows: ${JSON.stringify(rs.rows)}`)
	let headers = []
	if (rs.rows.length > 0)
	    headers = rs.rows[0].verses
	res.render('pages/books.ejs', {"rows" : rs.rows, "cols" : headers});
    })

    app.use("/book", router);
};
