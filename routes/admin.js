const express = require('express')
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")
const EventControllers = require("../controllers/EventControllers")

router.get('/',function(req, res){
    res.render('adminHome',{title:'Admin'})
})

router.get('/catalog',
EventControllers.getAdminEvent)
router.get('/catalog/add',function(req, res){
    res.render('adminCatalogAdd',{title:'New Item'})
})
router.post('/catalog/create',
EventControllers.create) 
router.post('/catalog/update',
EventControllers.update) 

router.get('/edit/:id',
EventControllers.editEvent)
router.get('/delete/:id',
EventControllers.delete)

router.get('/users',
UserControllers.userList)
router.get('/users/:id',
UserControllers.userInfo)
router.get('/deregister/:id',
UserControllers.eventDreg)

module.exports = router