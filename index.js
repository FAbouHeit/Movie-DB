const express = require('express');
const app = express();

const time = new Date();
const timeDisplay = `${time.getHours()}:${time.getSeconds()}`

app.get('/', (req,res)=>{
    console.log("here")
    
})

app.get('/test', (req,res)=>{
    res.json({status:200, message:"ok"})
})
app.get('/time', (req,res)=>{
    res.json({status:200, message:timeDisplay})
})

app.listen(3002);