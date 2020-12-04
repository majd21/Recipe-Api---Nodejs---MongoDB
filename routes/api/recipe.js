const express = require('express')
const Recipe = require('../../models/recipes')
const upload = require('../../middleware/uploadImage')
const router = express.Router()

//* Post req - Create a new Recipe
router.post('/recipes',
upload.single('photo')
,async (req , res) => {
    try {
    
    let recipe = new Recipe()
    recipe.title = req.body.title
    recipe.photo = req.file.filename
    recipe.items = req.body.items
    recipe.people = req.body.people
    recipe.description = req.body.description

    
    await recipe.save()

    res.json({
        status: true,
        message: "Create a new Recipe Successfully",
        recipe: recipe
    })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to create a new recipe",
            error: error
        })
    }
})

//* GET req - Get all recipes
router.get('/recipes' , async (req , res) => {
    try {
        let recipes = await Recipe.find()
        res.json({
        status: true,
        recipe: recipes
    })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
})

//* Get req - Get a single recipe
router.get('/recipes/:id' , async (req , res) => {
    try {
        let id = req.params.id
        let recipe = await Recipe.find({_id : id})

        res.json({
            status: true,
            recipe: recipe})
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
})

//* PUT req - Update a recipe
router.put('/recipes/:id' , async (req , res) => {
    try {
        let id = req.params.id
        let recipe = await Recipe.findByIdAndUpdate({ _id: id } , {
            $set : {
                title : req.body.title,
                photo: req.body.photo,
                items: req.body.items,
                description: req.body.description,
                people: req.body.people
            }
        } ,
        {upsert: true}
        )

        res.json({
            status: true,
            message: "Successfully Updated",
            UpdatedRecipe: recipe
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
})

//* Delete req - Delete a recipe
router.delete('/recipes/:id' , async (req , res) => {
    try {
        let id = req.params.id
        let deletedRecipe = await Recipe.findByIdAndDelete({_id: id })

        
            res.json({
                status: true,
                message: "Successfully Deleted",
                deletedRecipe: deletedRecipe
            
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
})



module.exports = router