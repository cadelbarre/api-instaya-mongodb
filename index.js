require('dotenv').config()
require('./db/moongo')
const cors = require('cors')

const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3001)

app.use(express.json({ limit: '50mb' })) // Middlewares de express
app.use(cors())

const userRouter = require('./routes/user')
const serviceRouter = require('./routes/service')

app.use('/api/user', userRouter)
app.use('/api/service', serviceRouter)

app.listen(app.get('port'), () => console.log(`Server running in port ${app.get('port')}`))
