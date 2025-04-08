const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db');

const employeesRoutes = require('./routes/employeesRoutes')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors()) 

app.use('/api/employees', employeesRoutes)





app.listen(8800, () => {
    console.log('contected 👩‍💻');
    
} )