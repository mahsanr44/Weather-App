const request= require('request');

const forecast = (lat, long, callback) => {
    
const url = `http://api.weatherstack.com/current?access_key=760c1cb5afd7968d70616290acf35bb7&query=${lat},${long}`;
request({url,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to weather service');
    }
    else if(response.body.error){
        callback('Unable to find location')
    }
    else{
        callback(undefined, (`It's ${response.body.current.weather_descriptions[0]} here and the temperature currently is ${response.body.current.temperature} degree out & it feels like ${response.body.current.feelslike}  degree `));
    }}
);
}


module.exports = forecast;