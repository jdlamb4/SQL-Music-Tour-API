// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Time } = db
const { Op } = require('sequelize')

// Index Route 
// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: { 
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` } 
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// SHOW Route
// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name  },
            include: [
                { 
                    model: Meet_Greet, 
                    as: "meet_greets", 
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: { 
                        model: Event, 
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
                },
                { 
                    model: Set_Time, 
                    // as: "set_times",
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: { 
                        model: Event, 
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
                }
            ] 
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE Route
// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE (PUT) ROUTE
// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE ROUTE
// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = bands



// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name  },
            include: [ 
                { 
                    model: MeetGreet, 
                    as: "meet_greets",
                    include: { model: Event, as: "event" } 
                },
                { 
                    model: SetTime,
                    as: "set_times",
                    include: { model: Event, as: "event" }
                }
            ] 
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})
