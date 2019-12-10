const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const axios = require("axios");
const MongoStore = require("connect-mongo")(session);
//MongoStore is blueprint
const flash = require("connect-flash");
const app = express();
require("./models/db.js");
let sessionOptions = session({
    secret: "javascript iso cool",
    store: new MongoStore({ client: require("./db") }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true }
});
app.use(sessionOptions);
app.use(flash());

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//console.log(router);
app.use(express.static("public"));
app.set("views", "views");
//^this views is folder location

// Configure Handlebars

const hbs = exphbs.create({
    extname: ".hbs",
    helpers: {
        increment: function(value) {
            return parseInt(value) + 1;
        }
    }
});
app.set("view engine", "ejs");
//^ engine name

// Register Handlebars as view engine
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Static Public Folder

app.use(express.static(path.join(__dirname, "public")));

//cache delete
app.use(function(req, res, next) {
    if (!req.user) {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
    }
    next();
});

app.use("/", router);
module.exports = app; //exporting the app.listen to db.js