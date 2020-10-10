const request = require('postman-request');

const geocode = (address,callback)=>{
  const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hyZXlhZGhhciIsImEiOiJja2ZxeGRyOXMxZXp6MnhzNTJ1ejNqa2VyIn0._fvcMEqVTJGIiNVScaFFTw&limit=1';
   request({url:url,json:true},(error,response)=>{
     if(error){
     	// sending error thtas why one argument i.e for error and nothing for data 
     	callback('Unable to connect data',undefined)
     }else if(response.body.features.length <= 0){
     	// sending error thtas why one argument i.e for error and nothing for data
     	callback('Unable to find location',undefined)
     }
     else{
        callback(undefined,{
        	// properties
        	 lat: response.body.features[0].center[1],
        	 longit: response.body.features[0].center[0],
        	 loc: response.body.features[0].place_name
        })
     }
   });
}

module.exports = geocode