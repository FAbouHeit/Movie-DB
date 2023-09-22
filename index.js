const express = require('express');
const app = express();

const time = new Date();
const timeDisplay = `${time.getHours()}:${time.getSeconds()}`

app.get('/', (req,res)=>{
    console.log("here")
    res.json({status:200, message:"ok"})
})

app.get('/test', (req,res)=>{
    res.json({status:200, message:"ok"})
})
app.get('/time', (req,res)=>{
    res.json({status:200, message:timeDisplay})
})

app.get('/hello/:ID?', (req,res)=>{
    // res.json({status:200, message:timeDisplay})
    // res.send(req.params);
    if(!req.params.ID) req.params.ID = ""
    res.json({status: 200, message: `Hello ${req.params.ID}`})
})

app.get('/search?s=:Search?', (req,res)=>{
    if(req.params.Search) 
    res.status(200).json({status:200, message: "ok", data: `${req.params.Search}`})
    else
    res.status(500).json({status:500, error: true,message:"you have to provide a search"})
   
})

app.listen(3002);