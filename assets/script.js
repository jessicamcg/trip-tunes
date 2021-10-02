fetch("https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=%3CREQUIRED%3E&count=20&type=playlists", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
		"x-rapidapi-key": "22e71f10d1msh07051f2aa164562p1e0d92jsn4703fdeb299a"
	}
})
.then(response => {
	console.log(response);
})
.then(function(data){
console.log(data);
})

.catch(err => {
	console.error(err);
});