const mysql = require("mysql");

/**
 * File name: dbconnection.js
 * Purpose: This is where we store database config to create and it connects to SQL databse which
 *          is used in our entire program.
 * Authors: YG
 */

//Create connection to remote DB
const connection = mysql.createConnection({
  host: "54.153.71.183",
  user: "remoteUser",
  password: "team8WorldWide",
  port: "3306",
  database: "gatorgoods",
});

// Connect DB
connection.connect((err) => {
  if (!err) console.log("SQL Database Connected...");
  else
    console.log(
      "SQL Database NOT connected... " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = connection;
