const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const forumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required."
    },
    comments: {
        type: String,
        required: "This field is required."
    },
    varified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: moment().format("ll")
    }
});

mongoose.model("forum", forumSchema);