const Stuff = require('../models/stuffModel')
const mongoose = require('mongoose')

//get all stuff
const getAllStuff = async (req, res) => {
    const stuff = await Stuff.find({}).sort({ createdAt: -1 })

    res.status(200).json(stuff)
}

//get a single stuff
const getStuff = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Does not exist" })
    }

    const stuff = await Stuff.findById(id)

    if (!stuff) {
        return res.status(404).json({ error: "Does not exist" })
    }
    res.status(200).json(stuff)
}

//create a new stuff
const createStuff = async (req, res) => {
    const { name, quantity, price } = req.body

    let emptyFields = []

    if(!name) {
        emptyFields.push('name')
    }
    if(!quantity) {
        emptyFields.push('quantity')
    }
    if(!price) {
        emptyFields.push('price')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    try {
        const stuff = await Stuff.create({ name, quantity, price })
        res.status(200).json(stuff)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete something
const deleteStuff = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Does not exist" })
    }

    const stuff = await Stuff.findOneAndDelete({ _id: id })

    if (!stuff) {
        return res.status(400).json({ error: "Does not exist" })
    }

    res.status(200).json(stuff)
}

//update something
const updateStuff = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Does not exist" })
    }

    const stuff = await Stuff.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!stuff) {
        return res.status(400).json({ error: "Does not exist" })
    }
    
    res.status(200).json(stuff)
}


module.exports = {
    getAllStuff,
    getStuff,
    createStuff,
    deleteStuff,
    updateStuff
}