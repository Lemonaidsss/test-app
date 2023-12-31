require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuff')

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/stuff', stuffRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port 4000')
            console.log('connected to database')
        })
    })
    .catch((error) => {
        console.log(error)
    })




