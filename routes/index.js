const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

// login
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const Stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            lastName: req.user.lastName,
            Stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router