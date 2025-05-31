const express = require('express')
const router = express.Router()
const {protect} = require('../utils/authorizationValidation')
const paymentController = require('../controllers/paymentController')
router.route('/getAll').get(protect, paymentController.getAll)

module.exports = router; 