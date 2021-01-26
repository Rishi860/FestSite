const express = require('express')
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")

router.get('/',function(req, res){
    res.render('home',{title:'Admin'})
})
router.post('/login',
UserControllers.preLogin)

router.get('/catalog',function(req, res){
    res.render('adminCatalog',{title:'Catalog'})
})
router.post('/register',
UserControllers.preRegister) 

module.exports = router