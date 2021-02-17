const UserControllers = require('../controllers/UserControllers')
// const { verifytoken } = require('../controllers/userService')
const express = require('express')
const router = express.Router();


router.get('/register/:id',
UserControllers.eventRegister)

router.get('/dashboard/:id',
UserControllers.userDash)

module.exports = router
