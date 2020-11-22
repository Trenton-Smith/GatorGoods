const connection = require("../models/dbconnection");
const bcrypt = require("bcrypt");

//===========================================
//              Auth Controller
//===========================================

exports.signup = (req, res) => {
  const user_id = 0;
  const full_name = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 12);
  const checkUserquery = `SELECT * FROM gatorgoods.User WHERE email ="${email}"`;
  console.log(email);
  connection.query(checkUserquery, (err, result) => {
    if (err) {
      res.json({
        sucess: false,
        message: "Something went wrong. Please try again.",
      });
    }
    if (result.length == 0) {
      const query =
        "INSERT INTO  gatorgoods.User(user_id, full_name, email, password) VALUES ?";
      const values = [[user_id, full_name, email, password]];
      connection.query(query, [values], (err, result) => {
        if (err) {
          res.json({
            sucess: false,
            message: "Something went wrong. Please try again.",
          });
        } else {
          res
            .status(200)
            .json({
              sucess: true,
              message: `Welcome! You are sucessfully registered.`,
            })
            .redirect("/");
        }
      });
    } else {
      res.json({
        sucess: false,
        message: "User already exist. Try another email.",
      });
    }
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM gatorgoods.User WHERE email = "${email}"`;
  connection.query(query, async (err, result) => {
    if (err) {
      res.json({
        sucess: false,
        message: "Something went wrong. Please try again.",
      });
    } else {
      const match = await bcrypt
        .compare(password, result[0].password)
        .then((match) => {
          console.log(match);
          if (match) {
            console.log("Matched");
            req.session.user = result[0].user_id;
            req.session.admin = result[0].admin;
            res.send(result);

            // console.log(` login result => ${JSON.stringify(result)}`);
            // console.log(` session.user => ${JSON.stringify(req.session.user)}`);
          } else {
            res.json({
              sucess: false,
              message: "Wrong email or password. Try again!",
            });
          }
        });
    }
  });
};

exports.authenticate = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user, admin : req.session.admin });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
};
