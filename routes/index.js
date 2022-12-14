const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const Story = require('../models/Story')

//@desc Login/landing page
//@route GET /
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        console.log(req.user)
        res.render('dashboard',{
            name:req.user.firstName,   //allows us to access the first name of our user
        })
    
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
   
})

module.exports = router