const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// var corsOptions = {  origin: "http://localhost:8080" };
const path = require("path");
const u = require("./app/util/utils") // log and loglevel

// -------------------------------------------------------------------------------
require("dotenv").config();
const db = require('./app/db')

// app.use(cors(corsOptions)); // see options above
// -------------------------------------------------------------------------------
app.set("views", path.join(__dirname, "app/views"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "app/public")))
app.use('/assets', express.static(path.join(__dirname, "app/assets")))
app.use('/util', express.static(path.join(__dirname, "app/util")))
app.use('/stylesheets', express.static(path.join(__dirname, "app/public/stylesheets")))

// debug via "dd" and level from 0 - 5

app.use((req, res, next)=>{
    res.locals.ppdate = u.ppdate
    res.locals.dd = 0
    if ((typeof req.query) === 'undefined') {
	// ok - leave it at zero
    } else {
	if ((typeof req.query.dd) === 'undefined') {
	    // still leaving it at zero...
	} else {
	    let n = parseInt(req.query.dd)
	    if (n !== n) // because NaN is never equal to itself
		n = 0
	    res.locals.dd = n
	}
    }
    next();
})

// simple route
app.get("/", (req, res) => { res.redirect('/home'); });
app.get("/home", (req, res) => { res.render('pages/home.ejs'); })
app.get("/learnMore", (req, res) => { res.render('pages/learnMore.ejs');})
app.get("/data", (req, res) => { res.render('pages/data.ejs'); })
app.get("/textViewer", (req, res) => { res.render('pages/textViewer.ejs'); })
app.get("/analytics", (req, res) => { res.render('pages/analytics.ejs'); })
app.get("/visualize", (req, res) => {  res.render('pages/visualize.ejs'); })
app.get("/manuscripts", (req, res) => { res.render('pages/manuscripts.ejs'); })

app.get("/zzdots/:bk?", (req, res) => {
    u.log(1,'\n/dots/:book');
    var book = ''
    book = req.params.book

    u.log(1, `/dots/${book} book-is-undefined? : ${'undefined' == (typeof book) }  date: ${Date()} `);
    var parms = []
    if ((typeof book) !== 'undefined' )
    {
	sql = `select id, book, witness, w, verses, ones from dots where book = $1 order by book, witness `;
	parms = [book]
    } else {
	sql = `select id, book, witness, w, verses, ones from dots order by book, witness`;
	book = ''
    }
    res.locals.book = book
    
    u.log(2,`  sql: ${sql}  parms:${JSON.stringify(parms)}`);
    var rs = db.query(sql, parms)
	.then((rs) => {
	    // res.send(data.results)
	    var headers = []
	    var toshow = ''
	    if (rs.rows.length > 0) {
		toshow = rs.rows[0]
		headers = rs.rows[0].verses
		u.log(1,`   rows[0]: ${JSON.stringify(rs.rows[0])} \n\n cols: ${JSON.stringify(rs.rows[0].verses)}`);	    }

	    res.render('pages/dots.ejs', {"rows" : rs.rows, "cols" : headers});
	})
	.catch((err) => {
	    res.status(500).send({
		msg: err.message || "ERROR retrieving dots."
	    })
	})

})


app.get("/percent", (req, res) => {
    u.log(1,'/percent');
    //
    // select book, witness, w, array_length(ones,1) n, ones from dots where book = '${aBook}' order by book, w
    //
    var rs = db.query(`select id, book, witness, w, array_length(verses,1) as versesN, verses, array_length(ones,1) as onesN, ones from dots order by book, witness`)
	.then((rs) => {
	    // res.send(data.results)
	    u.log(1,`   rs: ${rs} ${JSON.stringify(rs.rows)} \n\n cols: ${JSON.stringify(rs.rows[0].verses)}`);
	    res.render('pages/dots_percent.ejs', {"rows" : rs.rows, "cols" : rs.rows[0].verses});
	})
	.catch((err) => {
	    res.status(500).send({
		msg: err.message || "ERROR retrieving dots."
	    })
	})

})


app.set("view engine", "ejs");


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

require('./app/routes/book.routes')(app);

// -------------------------------------------------------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`theot1 server is running on port ${PORT}.`);
});
