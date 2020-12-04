const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema({
    title: String,
    photo: String,
    items: String,
    time: {type: Date , default: Date.now },
    description: String,
    people: Number
})

module.exports = mongoose.model('Recipe' , Recipe)
