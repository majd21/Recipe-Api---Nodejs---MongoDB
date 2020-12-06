const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    body: String,
    time: {
        type: Date,
        default: Date.now()
    },
    recipeID: {
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }
})

module.exports = mongoose.model("Comment" , CommentSchema)