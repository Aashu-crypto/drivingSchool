const express = require('express');
const router = express.Router();


router.get('/details',(req,res)=>{
    res.json({
        name:"Aashutosh",
        lastName:"Gandotra",
        email:'ashugandotra14@gmail.com'
        
        
    })
})

module.exports = router