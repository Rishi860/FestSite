const express = require('express')
const router = express.Router();
const EventControllers = require("../controllers/EventControllers")

// const {verifytoken} = require('../controllers/userService') verifytoken,

router.get('/catalog',
    EventControllers.getEvent)

router.get('/', function(req, res){
    res.render('home',{title:'Home'})
})

module.exports = router