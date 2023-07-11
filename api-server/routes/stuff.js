const express = require('express')
const {
    getAllStuff,
    getStuff,
    createStuff,
    deleteStuff,
    updateStuff
} = require('../controllers/stuffController')

const router = express.Router()

//get all stuff
router.get('/', getAllStuff)

//get a single stuff
router.get('/:id', getStuff)

//post a new stuff
router.post('/', createStuff)

//delete something
router.delete('/:id', deleteStuff)

//update a new stuff
router.patch('/:id', updateStuff)


module.exports = router