const dotenv = require("dotenv");
const chalk = require("chalk");
const moment = require("moment");
const mongodb = require("mongodb");
dotenv.config();

mongodb.connect(
    process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, client) {
        module.exports = client;

        const app = require("./app"); //importing app.listen to db file because it's pointless to have your server running before the connection to the db has been established
        app
            .listen(process.env.PORT, function() {
                console.log(
                    "\n" +
                    chalk.black.bgMagenta(
                        "Application has started and running on port ::" +
                        process.env.PORT +
                        ":: on " +
                        moment().format("LLLL") +
                        ""
                    )
                );
            })
            .on("error", function(error) {
                console.log(chalk.red("Unable to start app. Error >>>>", error));
            });
    }
);