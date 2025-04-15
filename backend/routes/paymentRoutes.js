const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
router.route('/getAll').get(paymentController.getAll)

module.exports = router; 