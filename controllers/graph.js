const graphRoute = {};
const axios = require("axios");

graphRoute.graphPage = function(req, res, next) {
    axios
        .get("https://api.coinranking.com/v1/public/coins?base=EUR&timePeriod=7d")
        .then(response => {
            var data = response.data;

            res.render("graph", {
                username: req.session.user.username,
                result1: data.data.coins
            });
        });
};

module.exports = graphRoute;