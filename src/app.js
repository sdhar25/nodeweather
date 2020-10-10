const path = require('path');
const express =require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'))

const app = express();
const port=process.env.PORT || 3000;

//define path for express config
const pubdir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialPages = path.join(__dirname,'../templates/partial') //for partial ie. header footer type pages


// setup handle bar engine
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPages)

// setup static directory to serve
app.use(express.static(pubdir));

// app.get('',(req,res)=>{
// 	res.render('index')
// 	// render our views...template
// })
// FOR MAKING DyNAMIC
app.get('',(req,res)=>{
	res.render('index',{
		title:'Index from hbb',
		name:'shreya dhar'
	})
})



//about hbs

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About Me',
		name:'Shreya dhar'
	});
});

// help hbs
app.get('/help',(req,res)=>{
	res.render('help',{
		title:'help page',
		msg:'help Each Other',
		name:'Shreya Dhar'
	})
});

// earllier work
// app.get('/',(req,res)=>{
//    res.send('<h1>Hello express</h1>');
// });


// earlier datas
// app.get('/help',(req,res)=>{
// 	res.send({
//       name:'Shreya',
//       age:26
// 	});
// });

app.get('/arraydata',(req,res)=>{
	res.send(
      [
     {
     	name:'shreya'
     },{
     	name:'chumki'
     }
      ]
		);
});


// app.get('/about',(req,res)=>{
//    res.send('<h1>About Page</h1>');
// });

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'You must provide search item'
		});
	}
// else part
	geocode(req.query.address,(error,{lat,longit,loc} = {})=>{
		if(error){
			return res.send({error})
		}
		forecast(lat,longit,(error,forecastData)=>{
			if(error){
				return res.send({error})
			}
			res.send({
				forecast:forecastData,
				loc,
				address:req.query.address
			})
		})
	})
	
	// res.send({
	// 	forecast:'It is hot',
	// 	location:'patna',
	// 	address:req.query.address
	// });
});

app.get('/products',(req,res)=>{
	// console.log(req.query) from search to alast in form of object gives http://localhost:3000/products?search=vbhj&gh=ghjk
	if(!req.query.search){
		return res.send({
			error:'You must provide some searcch term'
		})
	}
	//you can use 'else' but then you have to remove return
	console.log(req.query.search); // gives only search part
	res.send({
		products:[]
	})
})

//for 404
app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'error page',
        erroemsg:'help article not found',
		name:'Shreya dhar'
	});
})

app.get('*',(req,res)=>{
	res.render('404',{
		title:'error page',
        erroemsg:'Page not found',
		name:'Shreya dhar'
	});
})
app.listen(port,()=>{
	console.log('server is up on'+port)
});