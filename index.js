const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path : './config/.env' })

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

//DB
require('./config/db')()

const authRoute= require('./routes/auth.routes.js')
const productRoute = require('./routes/product.routes.js')

app.use('/users', authRoute)
app.use('/product', productRoute)

app.listen(process.env.PORT, () => console.log(`Server has ran`))