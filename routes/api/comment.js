const express = require('express')
const verifyToken = require('../../middleware/verify-token')
const Comment = require('../../models/comment')

const router = express.Router()

//* Post req - create a comment
router.post('/comments/:recipeID', verifyToken , async (req ,res) => {
    try {
        const newComment = new Comment()
    newComment.user = req.decoded._id
    newComment.body = req.body.body
    newComment.recipeID = req.params.id

    const savedComment = await newComment.save()

    if(savedComment) {
        res.json({
            status: true,
            message: "Successfully create a comment",
            comment: savedComment
        })
    }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

//* Get req - get all comment by recipe id
router.get('/comments/:recipeID' , async (req ,res ) => {
    try {
        const recipeComments = await Comment.find({
            recipeID : req.params.recipeID
        }).populate('user').exec()
    
        res.json({
            status: true,
            comments: recipeComments
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = router
