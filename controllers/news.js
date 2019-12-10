const newsRoute = {};
//const newsRoutemodel = require('./../models/News.js');
const axios = require("axios");

newsRoute.newsPage = function(req, res) {
    axios
        .get("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
        .then(response => {
            var data = response.data;
            res.render("news", {
                username: req.session.user.username,
                data: data.Data
            });
        })
        .catch(err => {
            console.log(err);
        });
};
module.exports = newsRoute;