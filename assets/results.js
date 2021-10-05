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
	queryUrl = "https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + artist + "+&count=1000&type=tracks"

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

    console.log('test');

	for (i=0; totalDuration<durationTrip; i++) {
        var trackLength = parseInt(data.Results[i].duration_ms) / 1000 ;
		
		totalDuration += trackLength;
        trackInfoArr.push(data.Results[i])

        // console.log(totalDuration, trackLength , data.Results[i].name);
	};
    // console.log(totalDuration);
    // console.log(trackInfoArr);
    printTracklist(trackInfoArr);
};

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return (
		seconds == 60 ?
		(minutes+1) + ":00" :
		minutes + ":" + (seconds < 10 ? "0" : "") + seconds
	  );
	}



function printTracklist(trackInfoArr) {
	var mainEl = document.querySelector('main');
	console.log(trackInfoArr);
	console.log(trackInfoArr[0].artists[0].name)
	for (i=0; i<trackInfoArr.length; i++){
	//creates card. adds track name(with anchor link to spotify url), adds artist name, adds album name, adds duration, MAYBE album cover, MAYBE preview.
	var trackCard = document.createElement('div');
	trackCard.innerHTML = '<div><h2><a href='+trackInfoArr[i].external_urls.spotify+'>'+
	trackInfoArr[i].name +
	'</a></h2><p>'+
	trackInfoArr[i].artists[0].name+
	'</p><p>'+
	trackInfoArr[i].album.name+
	'</p><p>'+
	millisToMinutesAndSeconds(trackInfoArr[i].duration_ms)+
	'</p>'

	

	mainEl.appendChild(trackCard);
	}
	// mainEl.appendChild(trackCard);
	// var artistName = document.createElement('h2');
	// artistName.textContent = trackInfoArr[0].artists[0].name;
	// trackCard.appendChild(artistName);


};

getParameters();