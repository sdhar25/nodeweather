const request = require('postman-request');
const forecast = (lat,long,callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=73c73744ffe919ca41390740027bfb51&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=f';
    request({url:url,json:true},(error,response)=>{
    	if(error){
    		callback('Unable to connect data',undefined)
    	}else if(response.body.error){
    		callback('Unable to find location',undefined)
    	}else{
    		callback(undefined,{
    			currenttemp:response.body.current.temperature,
    			feellike:response.body.current.feelslike
    		});
    	}
    });
}
module.exports = forecast