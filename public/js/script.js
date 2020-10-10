console.log('client side javascript file');
fetch('http://puzzle.mead.io/puzzle').then((response) =>{
	response.json().then((data)=>{
		console.log(data)
	})
})

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const weatherform = document.querySelector('form');
const search = document.querySelector('input');
weatherform.addEventListener('submit',(event)=>{
	event.preventDefault();
	const location = search.value
	console.log(location);
    messageOne.textContent="Loading..."
    messageTwo.textContent='';
    
	fetch('http://localhost:3000/weather?address='+location).then((response)=>{
	response.json().then((data)=>{
		// console.log(data)
		if(data.error){
			console.log(data.error);
			messageOne.textContent=data.error;
			messageTwo.textContent='';
		}else{
			console.log(data.loc);
			console.log(data.forecast);
			messageOne.textContent=data.loc;
			messageTwo.textContent='Current temp- '+data.forecast.currenttemp + ' ,Feels like-  ' + data.forecast.feellike;
		}
	})
})
})