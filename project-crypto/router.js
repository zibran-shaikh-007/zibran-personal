const express = require("express");
const router = express.Router();

require("./models/db.js");
const userController = require("./controllers/userController");

const dashboardRoute = require("./controllers/dashboard.js");
const forumController = require("./controllers/forumController.js");
const exchangesRoute = require("./controllers/exchanges.js");
const gamblingRoute = require("./controllers/gambling.js");

const reportRoute = require("./controllers/report.js");
const walletRoute = require("./controllers/wallet.js");

const newsRoute = require("./controllers/news.js");
const miningRoute = require("./controllers/mining.js");
const graphRoute = require("./controllers/graph.js");

// Add routes here
router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/dashboard", dashboardRoute.loadPage);
router.get("/gambling", gamblingRoute.gamblePage);
router.use("/forum", forumController);
router.get("/exchanges", exchangesRoute.exchangesPage);

router.get("/report", reportRoute.loadPage);
router.get("/wallet", walletRoute.walletPage);

router.get("/about", dashboardRoute.aboutPage);
router.get("/coin", dashboardRoute.coinPage);

router.get("/news", newsRoute.newsPage);
router.get("/graph", graphRoute.graphPage);
router.get("/mining", miningRoute.miningPage);

module.exports = router;