const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db');
require('dotenv').config();
const employeesRoutes = require('./routes/employeesRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const loginRoutes = require('./routes/loginRoutes')
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors()) 

app.use('/api/employees', employeesRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/login', loginRoutes)



app.listen(process.env.PORT, () => {
    console.log('contected 👩‍💻');
    
} )