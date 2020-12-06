const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const db = require('./middleware/db')

const app = express()

dotenv.config()
db()

//* main middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({
    limit: '50mb'
}))
app.use(express.urlencoded({
    limit: '50mb',
    extended: false
}))

//* routes
const RecipeRoutes = require('./routes/api/recipe')
const UserRoutes = require('./routes/api/user')
const CommentsRoutes = require('./routes/api/comment')

app.use('/api' , RecipeRoutes)
app.use('/api' , UserRoutes)
app.use('/api' , CommentsRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is started on port ' + PORT);
})