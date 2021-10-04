//fetch function takes user input and queries spotify
function spotifyFetch(query) {
	queryUrl = "https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + query + "+&count=20&type=tracks"
	// query = document.getElementById('userEntryPlaceholder').value;
		fetch(queryUrl, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
				"x-rapidapi-key": "22e71f10d1msh07051f2aa164562p1e0d92jsn4703fdeb299a"
			}
		})
			.then(response => {
				return (response.json());
			})
			.then(function (data) {
				// console.log(data.Results)
				// console.log(data.Results[0])
				getTracks(data)//passes data to next function

			})
			// .catch(err => {
			// 	console.error(err);
			// });
			
}
spotifyFetch(query);

function getTracks(data){
// console.log(data)
var totalDuration = 0;
var tripDuration;
for (i=0; totalDuration<tripDuration; i++) {
console.log(data.Results[i].duration_ms,data.Results[i].name);
totalDuration += data.Results[i].duration_ms;
console.log(totalDuration)
}
}