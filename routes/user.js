const UserControllers = require('../controllers/UserControllers')
const express = require('express')
const router = express.Router();


router.get('/register/:id',
UserControllers.eventRegister)

router.get('/dashboard/:name',
UserControllers.userDash)

module.exports = router
