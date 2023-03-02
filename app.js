const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const hbs=require('hbs');
const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'hbs');


const directory=path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/public/views')
app.set('views', viewsPath)

app.use(express.static(directory));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        message:'Welcome to Weather App'
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter an address'
        })
    }
    
    geocode(req.query.address, (error,{lat, long, location}={})=>{
        
        if(error){
            return res.send({error});
        }
        
        forecast(lat,long,(error,forecastData)=>{
            
            if(error){
                return res.send({error});
            }
            
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            
        })
    });
    
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});  
