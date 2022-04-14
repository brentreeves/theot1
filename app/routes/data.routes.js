const controller = require("../controllers/data.controller");
const u = require("../util/utils")

module.exports = function(app) {
    u.mylog(1,'data.routes.js ...');

    ??
    app.use(function(req, res, next) {
    	res.header(
    	    "Access-Control-Allow-Headers",
    	    "x-access-token, Origin, Content-Type, Accept"
    	);
    	next();
    });

    app.get("/data/dots", controller.allAccess);

    app.get("/data/user",
	[authJwt.verifyToken],
	controller.userAccess
    );

    app.get(
	"/data/admin",
	[authJwt.verifyToken, authJwt.isAdmin],
	controller.adminAccess
    );
};
