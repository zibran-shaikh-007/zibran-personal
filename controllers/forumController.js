const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Forum = mongoose.model("forum");

router.get("/", (req, res) => {
    res.render("forumAddOrEdit", { username: req.session.user.username });
});

router.post("/", (req, res) => {
    if (req.body._id == "") insertRecord(req, res);
    else updateRecord(req, res);
});

function insertRecord(req, res) {
    var forum = new Forum();
    forum.name = req.body.name;
    forum.comments = req.body.comments;
    //console.log(forum.comments);
    forum.save((err, doc) => {
        if (!err) res.redirect("forum/list");
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                // console.log(req.body);
                res.render("forumAddOrEdit", {
                    username: req.session.user.username,
                    forum: req.body
                });
            }
            if (err.comments == "ValidationError") {
                handleValidationError(err, req.body);
                // console.log(req.body);
                res.render("forumAddOrEdit", {
                    username: req.session.user.username,
                    forum: req.body
                });
            } else {
                console.log("Error during record insertion" + err);
            }
        }
    });
}

function updateRecord(req, res) {
    Forum.findOneAndUpdate({ _id: req.body._id },
        req.body, { new: true },
        (err, doc) => {
            if (!err) res.redirect("forum/list");
            else {
                if (err.name == "ValidationError") {
                    handleValidationError(err, req.body);
                    res.render("forumAddOrEdit", {
                        username: req.session.user.username,
                        forum: req.body
                    });
                }
                if (err.comments == "ValidationError") {
                    handleValidationError(err, req.body);
                    // console.log(req.body);
                    res.render("forumAddOrEdit", {
                        username: req.session.user.username,
                        forum: req.body
                    });
                } else console.log("Error during record update : " + err);
            }
        }
    );
}

router.get("/list", (req, res) => {
    //res.json('from list');
    Forum.find((err, docs) => {
        if (!err) {
            res.render("list", {
                username: req.session.user.username,
                list: docs
            });
        } else {
            console.log("Error in retrieving user list.", +err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "name":
                body["nameError"] = err.errors[field].message;
                break;
            case "comments":
                body["commentsError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get("/:id", (req, res) => {
    Forum.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("forumAddOrEdit", {
                username: req.session.user.username,
                forum: doc
            });
        }
    });
});

router.get("/delete/:id", (req, res) => {
    Forum.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/forum/list");
        } else {
            console.log("Error in deletion :" + err);
        }
    });
});

module.exports = router;