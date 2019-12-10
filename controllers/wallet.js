const walletRoute = {};
const axios = require("axios");

walletRoute.walletPage = function(req, res) {
    axios
        .get(
            "https://min-api.cryptocompare.com/data/wallets/general?api_key=e12e5dcad86f5142d33d836793d530e6075a2c0d00da87e1ddfe4d4b409962b4"
        )
        .then(response => {
            var data = response.data;
            res.render("wallet", {
                username: req.session.user.username,
                data: data.Data
            });
        })
        .catch(err => {
            console.log(err);
        });
};
module.exports = walletRoute;