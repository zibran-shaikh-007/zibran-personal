const miningRoute = {};
const axios = require("axios");

miningRoute.miningPage = function(req, res) {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/mining/companies/general?api_key=e12e5dcad86f5142d33d836793d530e6075a2c0d00da87e1ddfe4d4b409962b4"
        )
        .then(response => {
            var data = response.data;
            //console.log(data.Data);
            res.render("mining", {
                username: req.session.user.username,
                data: data.Data
            });
        })
        .catch(err => {
            console.log(err);
        });
};
module.exports = miningRoute;