const gamblingRoute = {};

const axios = require("axios");
// const dashboardRoutemodel = require('./../models/Dashboard.js');
//const gamblingRoutemodel = require('./../models/gambling.js');
gamblingRoute.gamblePage = function(req, res, next) {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/gambling/general?api_key=e12e5dcad86f5142d33d836793d530e6075a2c0d00da87e1ddfe4d4b409962b4"
        )
        .then(response => {
            var data = response.data;
            var username;
            res.render("gambling", {
                //result : data.Data
                username: req.session.user.username,
                result: data.Data
            });
        });
};
module.exports = gamblingRoute;