const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


const app= express();

app.get('/', (res, req)=>{
    res.send("HOme page")
})

mongoose.connect('mongodb://localhost/cov', { useNewUrlParser: true } )

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log("Connection created"))

app.use(express.json())


app.use(bodyParser.json())
const caseRouters = require('./routers/caseRouters')
app.use('/cases', caseRouters);


app.listen(3000);
