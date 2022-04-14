const u = require("../util/utils")

module.exports = (app) => {
    u.log(1,'dots.routes.js ...');
    
    const dots = require("../controllers/dots.controller.js");
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

    router.post("/", dots.create);

    router.get("/", (req,res) => {
	let rows = dots.findAll(req,res);
	let headers = rows[0].verses

	res.render('pages/dots.ejs', {"rows" : rows, "cols" : headers});
    });

    router.get("/:book", (req,res) => {
	let rs = dots.findBook(req,res)
	u.log(2,`\n\ndots.routes /:book rs: ${JSON.stringify(rs)}\n\n`)
	var headers = []
	var toshow = ''
	if (rs.rows.length > 0) {
	    toshow = rs.rows[0]
	    headers = rs.rows[0].verses
	    u.log(1,`   rows[0]: ${JSON.stringify(rs.rows[0])} \n\n cols: ${JSON.stringify(rs.rows[0].verses)}`);	    }
	res.render('pages/dots.ejs', {"rows" : rs.rows, "cols" : headers});
    });

    app.use("/data/dots", router);
};
