const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')

router.route('/').post(employeesController.addNewEmployee)

module.exports=router;