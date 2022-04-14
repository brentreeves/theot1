// middleware / verifySignUp
//
const db = require("../db")
const u = require("../util/utils.js")

checkDuplicateUsernameOrEmail = (req, res, next) => {
    var parms = [req.body.username];
    db.query('select id, email from users where email = $1', parms)
	.then((rs) => {
	    u.mylog(`verifySignUp checkDuplicateUsernameOrEmail rs: ${rs}`)
	    // ??
	    if (false) {
		u.mylog(0,{msg:"Username already in use"});
		res.status(400).send({msg: "Sorry - that id already in use."});
		return;
	    }
	    next();
	})
	.catch((err) => {
	    return console.error(err);
	});
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
	db.query('select id, name from roles order by id')
	    .then((rs) => {
		u.mylog(1, `  roles: ${rs} ${JSON.stringify(rs)}`)
		//
		// now nerf through roles checking
		for (let i = 0; i < req.body.roles.length; i++) {
		    //		    if (! ROLES.includes(req.body.roles[i])) {
		    // ??
		    if (true)
			res.status(400).send({
			    message: "Failed! Role does not exist = " + req.body.roles[i]
			});
		    return; // happy
		}
	    })
    }
    next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;
