const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
router.route('/').post(loginController.login)
router.route('/register').post(loginController.register)
router.route('/logout').post(loginController.logout)
module.exports=router;