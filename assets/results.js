var searchParamsArr = document.location.search.split('&');

var durationTrip = parseInt(searchParamsArr[0].split('=').pop());
var artistQuery = searchParamsArr[1].split('=').pop();

function getParameters() {
    // var searchParamsArr = document.location.search.split('&');

    // // Get the query and format values
    // var durationTrip = parseInt(searchParamsArr[0].split('=').pop());
    // var artistQuery = searchParamsArr[1].split('=').pop();
    console.log(searchParamsArr);
    console.log(durationTrip, artistQuery);
    console.log(typeof durationTrip);
    spotifyFetch(artistQuery)
}

//fetch function takes user input and queries spotify
function spotifyFetch(artist) {
	queryUrl = "https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + artist + "+&count=100&type=tracks"

		fetch(queryUrl, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
				"x-rapidapi-key": "22e71f10d1msh07051f2aa164562p1e0d92jsn4703fdeb299a"
			}
		}).then(response => {
			return (response.json());
		}).then(function (data) {
            console.log(data);
			getTracks(data)//passes data to next function
		}).catch(err => {
			console.error(err);
		});

};

function getTracks(data){
	var totalDuration = 0;
    var trackInfoArr = [];

    console.log(durationTrip, artistQuery);

	for (i=0; totalDuration<durationTrip; i++) {
        var trackLength = parseInt(data.Results[i].duration_ms) / 1000 ;
		
		totalDuration += trackLength;
        trackInfoArr.push(data.Results[i])

        console.log(totalDuration, trackLength , data.Results[i].name);
	};
    console.log(totalDuration);
    console.log(trackInfoArr);
    printTracklist(trackInfoArr);
};

function printTracklist(trackInfoArr) {

};

getParameters();