const express = require('express');
const app=express();


app.get('/',(req,res)=>{
    res.status(200).json({
        success : true,
        message : `running health check ${PORT}`
    })
})

app.get('/content',(req,res)=>{
    res.status(200).json({
        success : true,
        message : `This is the demo content from server hosted at ${PORT}`
    })
})

const PORT = 8001;
app.listen(PORT ,()=>{
    console.log(`server is listeniing on ${PORT}`);
})