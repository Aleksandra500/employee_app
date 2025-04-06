const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')

router.route('/addNewEmployee').post(employeesController.addNewEmployee)

module.exports=router;