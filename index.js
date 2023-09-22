const express = require('express');
const app = express();


app.get('/', (req,res)=>{
    console.log("here")
    res.send('OK')
})

app.listen(3000);