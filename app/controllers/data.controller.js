// data.controller.js
//

// view
// everybody
exports.allAccess = (req, res) => {
    res.render('pages/home.ejs')
};

// user
exports.userAccess = (req, res) => {
  res.status(200).send("User Content.");
};

// admin
exports.adminAccess = (req, res) => {
  res.status(200).send("Admin Content.");
};

