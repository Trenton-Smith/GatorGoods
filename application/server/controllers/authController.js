const connection = require("../models/dbconnection");
const bcrypt = require("bcrypt");


/**
 * File name: authController.js
 * Purpose: This is the controller where we make all the queries related to logging in, logging out, registering, and
 *          authenticating users. Depending on whether a registered user is logged-in or logged-out will either enable
 *          or block access to user-specific views e.g. Dashboard.js, NewListing.js. Additionally, this is where we
 *          protect user passwords by encrypting them prior to placing into the db.
 * Authors: YG, Trenton
 */

/*
 This is the query for registering a new user. It needs to implement bcrypt in order to "salt" a user password,
 encrypting it prior to db entry. It then gets decrypted on login.
*/
exports.signup = (req, res) => {
  const user_id = 0; // auto incremented in db
  const full_name = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 12); // encrypting password

  // ensure user is not already registered prior to INSERT query
  const checkUserquery = `SELECT * FROM gatorgoods.User WHERE email ="${email}"`;
  console.log(email);

  connection.query(checkUserquery, (err, result) => {
    if (err) {
      res.json({
        sucess: false,
        message: "Something went wrong. Please try again.",
      });
    }
    if (result.length == 0) { // if user is NOT already registered, insert into db
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

/*
 This allows a registered user to log into their account in order to access their unique views, contact another user, or
 make a post. The user's password needs to be decrypted before validation.
*/
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
        .compare(password, result[0].password) // decrypting the password here
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

/*
 This is not directly requested by the user, but is instead called by views in order to determine if a user is able to
 access a feature or view. If the user is not logged in, they are prompted to log in before accessing the functionality.
*/
exports.authenticate = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user, admin : req.session.admin });
  } else {
    res.send({ loggedIn: false });
  }
};

/*
 This allows the user to log out of the application. On log out, the user is redirected to the home (via Navigation.js),
 and is then blocked from certain features unless logged back in.
*/
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.send({ loggedIn: false });
  });
};
