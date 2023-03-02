const request = require("request");

const geocode=(address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token={your_access_token}`;


request({url,json:true},(error,response)=>{
    
    if(error){
        callback('Unable to connect to location services.');
    }
    else if(response.body.features.length===0){
        callback('Unable to connect to map service');
    }
    
     else{
        callback(undefined,{
            long: response.body.features[0].center[0],
            lat: response.body.features[0].center[1],
            location: response.body.features[0].place_name
        });
    }
})
}



module.exports=geocode;
