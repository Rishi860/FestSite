const express = require('express')
const router = express.Router();
const EventControllers = require("../controllers/EventControllers")
const userService = require("../controllers/userService")

// const {verifytoken} = require('../controllers/userService')

router.get('/catalog',
    EventControllers.getEvent)
 
router.get('/', function(req, res){
    res.render('home',{title:'Home'})
})

router.get('/loginstate',
    userService.loginState)

module.exports = router