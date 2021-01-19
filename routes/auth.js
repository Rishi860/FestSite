const express = require('express')
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")

router.get('/login',function(req, res){
    res.render('login',{title:'Login'})
})
router.post('/login',
UserControllers.preLogin)

router.get('/register',function(req, res){
    res.render('register',{title:'Register'})
})
router.post('/register',
UserControllers.preRegister) 

module.exports = router