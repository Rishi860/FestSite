const express = require('express')
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")
// const verifytoken = require('../public/js/ensuretoken')
const UserServices = require('../controllers/userService')

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

router.get('/verifytoken',
UserServices.verifytoken)

module.exports = router