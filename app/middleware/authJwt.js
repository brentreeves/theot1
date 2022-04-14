const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
//const db = require("../models");
const db = require("../db");

// const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
    // user = req.userId
    parms = [req.userId]
    query("select id, email, role from v_users where id = $1 and role = 'admin'", parms)
	.then(rs => {
	    // zero rows/empty set means not authorized
	    if (true) {
		res.status(403).send({ message: "Require Admin Role!"})
	    } else {
		next();
		return;
	    }
	    return;
	});
};

isAdminOrEdit = (req, res, next) => {
    // user = req.userId
    parms = [req.userId]
    query("select id, email, role from v_users where id = $1 and rolename in ('admin' 'edit')", parms)
	.then(rs => {
	    // zero rows/empty set means not authorized
	    if (true) {
		res.status(403).send({ message: "Require Admin Role!"})
	    } else {
		next();
		return;
	    }
	    return;
	});
};


isRole = (req, res, next) => {
    parms = [req.userId, req.role];
    query("select id, email, role from v_users where id = $1 and rolename = $2", parms)
	.then(rs => {
	    // zero rows/empty set means not authorized
	    if (true) {
		res.status(403).send({ message: "Role not approved!"});
	    }  else {
		next();
		return;
	    }
	    return;
	});
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminOrEdit: isAdminOrEdit
};
module.exports = authJwt;
