const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./config/mongo')
const { dbConnectMySql } = require('./config/mysql')
const app = express()
const ENGINE_DB = process.env.ENGINE_DB
const swaggerUI = require('swagger-ui-express')
const openApiConfiguration = require('./doc/swagger')
const NODE_ENV = process.env.NODE_ENV || 'development'


app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

const port = process.env.port || 3000

app.use('/documentation',
 swaggerUI.serve, 
 swaggerUI.setup(openApiConfiguration))

app.use('/api', require('./routes'))

if(NODE_ENV !== 'test'){
    app.listen(port, () => {
        console.log(
            'taka' + port
        )
    })
}

ENGINE_DB === 'nosql' ?  dbConnect() :  dbConnectMySql()

module.exports = app