const exchangesRoute = {};
const axios = require("axios");
exchangesRoute.exchangesPage = function(req, res, next) {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
        )
        .then(response => {
            var username;
            var data = response.data;
            res.render("exchanges", {
                username: req.session.user.username,
                result: data.Data
            });
        });
};
module.exports = exchangesRoute;