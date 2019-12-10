const User = require("../models/User");

//note: promise Resolved Value ===result
// note: e === error returned by reject function
exports.login = function(req, res) {
    let user = new User(req.body);
    user
        .login()
        .then(function(result) {
            req.session.user = { favColor: "blue", username: user.data.username };
            req.session.save(function() {
                res.redirect("/dashboard");
            });
        })
        .catch(function(e) {
            req.flash("errors", e);
            //req.session.flash.errors = [e]
            req.session.save(function() {
                res.redirect("/");
            });
        });
};

exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect("/");
    });
};

exports.register = function(req, res) {
    let user = new User(req.body);
    //form data is fetched ^^in it using req.body
    user
        .register()
        .then(() => {
            req.session.user = { username: user.data.username };
            req.session.save(function() {
                res.redirect("/dashboard");
            });
        })
        .catch(regErrors => {
            regErrors.forEach(function(error) {
                req.flash("regErrors", error);
            });
            req.session.save(function() {
                res.redirect("/");
            });
        });
};

exports.home = function(req, res) {
    // res.render('home-guest')
    if (req.session.user) {
        res.render("dashboard", { username: req.session.user.username });
    } else {
        res.render("home-guest", {
            errors: req.flash("errors"),
            regErrors: req.flash("regErrors")
        });
    }
};