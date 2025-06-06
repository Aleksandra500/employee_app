const express = require('express')
const router = express.Router()
const employeesController = require('../controllers/employeesController')
const {protect} = require('../utils/authorizationValidation')


router.route('/').post(protect, employeesController.addNewEmployee)
router.route('/hours').post(protect, employeesController.addHours)
router.route('/getAll').get( employeesController.getAllEmployees)
router.route('/:id').get(employeesController.getEmployeeById).delete(employeesController.deleteOne).put(protect, employeesController.putOne)
module.exports=router;