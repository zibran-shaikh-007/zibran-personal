const dashboardRoute = {};
const axios = require("axios");

dashboardRoute.loadPage = function(req, res, next) {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
        )
        .then(response => {
            var username;
            var data = response.data;
            res.render("dashboard", {
                username: req.session.user.username,
                result: data.Data
            });
        });
};

dashboardRoute.aboutPage = function(req, res) {
    res.render("about", { username: req.session.user.username });
};

dashboardRoute.coinPage = function(req, res) {
    res.render("coin", { username: req.session.user.username });
};

module.exports = dashboardRoute;