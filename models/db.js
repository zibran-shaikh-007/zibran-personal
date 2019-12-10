const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
    process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if (!err) {} else {
            console.log("Error in DB connection:" + err);
        }
    }
);

require("./forum.model.js");