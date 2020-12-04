const express = require('express')
const mongoose = require('mongoose')

function db() {
    mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Server connected to mongodb");
            }
        })
}

module.exports = db