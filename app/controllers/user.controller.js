exports.allAccess = (req, res) => {
    // res.status(200).send("Public Content.");
    res.render('pages/home.ejs')
};

exports.userAccess = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminAccess = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.editorAccess = (req, res) => {
  res.status(200).send("Editor Content.");
};
