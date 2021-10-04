query = "kanye"
fetch("https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + query + "&count=20&type=tracks", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
		"x-rapidapi-key": "22e71f10d1msh07051f2aa164562p1e0d92jsn4703fdeb299a"
	}
})
.then(response => {
	return(response.json());
})
.then(function(data){
	console.log(data)
})
.catch(err => {
	console.error(err);
});