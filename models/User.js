const bcrypt = require("bcryptjs");

const usersCollection = require("../db")
    .db()
    .collection("users"); //since the db.js is now exporting db client instead of database we need to add .db() before collection

const validator = require("validator");

let User = function(data) {
    this.data = data;
    //^ storing the passed data to a data variable since it will vanish if we dont save the data to a variable as soon as the function is done being called
    this.errors = [];
};
//video #9 quick misc
User.prototype.cleanUp = function() {
    if (typeof this.data.username != "string") {
        this.data.username = "";
    }
    if (typeof this.data.password != "string") {
        this.data.password = "";
    }
    if (typeof this.data.email != "string") {
        this.data.email = "";
    }

    //get rid of these properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    };
};

//vid #8

User.prototype.validate = function() {
    return new Promise(async(resolve, reject) => {
        if (this.data.username === "") {
            this.errors.push("Invalid username ");
        }
        if (
            this.data.username != "" &&
            !validator.isAlphanumeric(this.data.username)
        ) {
            this.errors.push(
                "please crete a username comprising alphabets and numbers only"
            );
        }
        if (this.data.username.length > 0 && this.data.username.length < 3) {
            this.errors.push("username must be at least 3 chars long");
        }
        if (this.data.username.length > 100) {
            this.errors.push("username must be less than 100 chars");
        }
        if (this.data.password === "") {
            this.errors.push("Invalid password ");
        }
        if (this.data.password.length > 0 && this.data.password.length < 8) {
            this.errors.push("password must be at least 8 characters long");
        }
        if (this.data.password.length > 50) {
            this.errors.push("pass must be be less than 50 chars");
        }
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("Invalid email ");
        }

        //only if username is valid then check if it's already taken
        if (
            this.data.username.length > 2 &&
            this.data.username.length < 31 &&
            validator.isAlphanumeric(this.data.username)
        ) {
            let usernameExists = await usersCollection.findOne({
                username: this.data.username
            }); // since findOne returns a promise so we can use async and await
            if (usernameExists) {
                this.errors.push("That username is already taken.");
            }
        }
        //only if email is valid then check if it's already taken
        if (validator.isEmail(this.data.email)) {
            let emailExists = await usersCollection.findOne({
                email: this.data.email
            }); // since findOne returns a promise so we can use async and await
            if (emailExists) {
                this.errors.push("That email is already being used.");
            }
        }
        resolve();
    });
};

//PROMISE METHOD
User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp();
        usersCollection
            .findOne({ username: this.data.username })
            .then(attemptedUser => {
                if (
                    attemptedUser &&
                    bcrypt.compareSync(this.data.password, attemptedUser.password)
                ) {
                    resolve("Welcome to our app!");
                } else {
                    reject("Invalid username/password");
                }
            })
            .catch(function() {
                reject("Unforseen error occured! Please try again later.");
            });
    });
};

User.prototype.register = function() {
    return new Promise(async(resolve, reject) => {
        // TODO: step#1: validate data
        this.cleanUp();

        await this.validate();
        //^^^here "this" is pointing to "user" from the file userController.js at line 16

        //TODO: Step#2: only if there are no validation errors then save the user data into a database

        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10);
            this.data.password = bcrypt.hashSync(this.data.password, salt);
            await usersCollection.insertOne(this.data);
            resolve();
        } else {
            reject(this.errors);
        }
    });
};

module.exports = User;