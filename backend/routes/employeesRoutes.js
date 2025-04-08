const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')

router.route('/').post(employeesController.addNewEmployee)
router.route('/:id?').get(employeesController.getEmployeeById)
router.route('/hours').post(employeesController.addHours)

module.exports=router;