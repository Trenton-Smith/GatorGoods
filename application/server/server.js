const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
 * File name: server.js
 * Purpose: This is used to connect the app to the server, enable and set the options for cookies, and increase the data
 *          limit for passing data to the database.
 * Authors: YG, Keith, Trenton
 */

app.use(
  cors({
    orgin: ["/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "150mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "150mb",
    extended: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    key: "user_id",
    secret: "authentication",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000 * 30, //user has 5 minutes after browser close until getting kicked out
    },
  })
);

app.use("/api/product", require("./routers/productRouter"));
app.use("/api/search", require("./routers/searchRouter"));
app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/dashboard", require("./routers/dashboardRouter"));
app.use("/api/message", require("./routers/messageRouter"));
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
