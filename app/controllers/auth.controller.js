//const db = require("../models");
const db = require("../db");
const config = require("../config/auth.config");
// const User = db.user;
// const Role = db.role;
// const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const u = require("../util/utils")

exports.signup = (req, res) => {
    // ?? insert into
    // Save User to Database
    var encrypted_password = bcrypt.hashSync(req.body.password, 8);
    var new_email = req.body.email;
    var parms = [new_email,
		 req.body.lname,
		 req.body.fname,
		 req.body.sms,
		 encrypted_password]
    var roles = req.body.roles;
    
// local_theot1=# insert into users (email, lname, fname) values ('aa@gmail.com', 'l1', 'f1') returning *;
//  id | lname | fname | sms |    email     | password
// ----+-------+-------+-----+--------------+----------
//   5 | l1    | f1    |     | aa@gmail.com |
// (1 row)

    db.query('insert into users (email, lname, fname, sms, password) returning *',parms)
	.then(rs => {
	    u.mylog(1,`auth.controller signup insert rs: ${rs}`)
	    if ((typeof rs) !== 'undefined') {
		let rows = rs.rows
		let newid = rows[0].id
		mylog(1,` signup ${new_email} newId: ${newid}`)
		parms = [newid, 1]
		db.query('insert into user_role (userid, roleid) values ($1, $2)', parms)
		    .then(rs => {
			res.send({msg: "User ${email} registered."})
		    });
	    }
	})
	.catch(err => {
	    res.status(500).send({ msg: err.message })
	});
};


// ??

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
