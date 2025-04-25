const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')



router.route('/').post(employeesController.addNewEmployee)
router.route('/hours').post(employeesController.addHours)
router.route('/getAll').get(employeesController.getAllEmployees)
router.route('/:id').get(employeesController.getEmployeeById).delete(employeesController.deleteOne)
module.exports=router;