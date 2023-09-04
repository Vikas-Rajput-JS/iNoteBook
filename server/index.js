const express = require('express')
const app = express()
const AuthRoute = require('./Routes/Auth')
const NotesRoute = require('./Routes/Notes')
const cors = require('cors')
require('./Db')
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Hello World!!')
})


app.use('/api/auth',AuthRoute)
app.use('/api/notes',NotesRoute)

app.listen(5500)