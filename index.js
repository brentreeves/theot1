// THEOT
// 2021 NEH grant
// Abilene Christian University
//
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
// var corsOptions = {  origin: "http://localhost:8080" };

global.LOGLEVEL = 0
const u = require("./app/util/utils") // log and loglevel

// -------------------------------------------------------------------------------
require("dotenv").config();
const db = require('./app/db')

// app.use(cors(corsOptions)); // see options above
// -------------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "app/public")))
app.use('/assets', express.static(path.join(__dirname, "app/assets")))
app.use('/util', express.static(path.join(__dirname, "app/util")))
app.use('/stylesheets', express.static(path.join(__dirname, "app/public/stylesheets")))


//
// debug via "/?dd=n" from 0 - 5 or so
//
app.use((req, res, next)=>{
    res.locals.ppdate = u.ppdate
    res.locals.dd = 0
    if ((typeof req.query) === 'undefined') {
	// ok - leave it at zero
    } else {
	if ((typeof req.query.dd) === 'undefined') {
	    // leave it alone
	} else {
	    let n = parseInt(req.query.dd)
	    if (n !== n) // because NaN is never equal to itself
		n = 0
	    res.locals.dd = n
	    LOGLEVEL = n
	    console.log(`DEBUG: ${n}`)
	}
    }
    next();
})

//
// navbar
//
app.get("/", (req, res) => { res.redirect('/home'); });
app.get("/home", (req, res) => { res.render('pages/home.ejs'); })
app.get("/learnMore", (req, res) => { res.render('pages/learnMore.ejs');})
app.get("/data", (req, res) => { res.render('pages/data.ejs'); })
app.get("/textViewer", (req, res) => { res.render('pages/textViewer.ejs'); })
app.get("/analytics", (req, res) => { res.render('pages/analytics.ejs'); })
app.get("/visualize", (req, res) => {  res.render('pages/visualize.ejs'); })
app.get("/manuscripts", (req, res) => { res.render('pages/manuscripts.ejs'); })


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

//
// routes
// 

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

require('./app/routes/book.routes')(app);
// require('./app/routes/bookstudies.routes')(app);

// -------------------------------------------------------------------------------
//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`theot1 server alive at: ${PORT}.`);
});
