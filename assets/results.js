var searchParamsArr = document.location.search.split('&');

var durationTrip = parseInt(searchParamsArr[0].split('=').pop());
var artistQuery = searchParamsArr[1].split('=').pop();


var mainEl = document.querySelector('main');

function getParameters() {
    var loading = document.createElement('div');
    loading.innerHTML = '<div id="loading"><img src="https://media0.giphy.com/media/17mNCcKU1mJlrbXodo/200w.webp?cid=ecf05e47cuar5y1wa3vag19nahou3ytlq4s1kkbzb6hlnwfh&rid=200w.webp&ct=g"></div>';
    mainEl.appendChild(loading);

    spotifyFetch(artistQuery)
}

//fetch function takes user input and queries spotify
function spotifyFetch(artist) {
	queryUrl = "https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + artist + "+&count=1000&type=tracks"

		fetch(queryUrl, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
				"x-rapidapi-key": "7a6df3fb48mshee26177317639e4p1d004bjsnb1cf10875525"
			}
		}).then(response => {
			return (response.json());
		}).then(function (data) {
            console.log(data);
			getTracks(data)//passes data to next function
		}).catch(err => {
            var alertArtist = document.createElement('div');
			alertArtist.innerHTML = 
			'<div class="callout large">' +
            '<h5>Error!</h5>' +
            '<p>There has been an error fetching your track list, try again</p>'+
            '<p>If the problem persists, try a shorter trip.</p>'+
            '<a href="./index.html">Back to the main page</a>' +
            '</div>';
			mainEl.appendChild(alertArtist);
		});

};

function getTracks(data){
	var totalDuration = 0;
    var trackInfoArr = [];

	for (i=0; totalDuration<durationTrip; i++) {
        var trackLength = parseInt(data.Results[i].duration_ms) / 1000 ;
		
		totalDuration += trackLength;
        trackInfoArr.push(data.Results[i])

	};

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
};

function printTracklist(trackInfoArr) {
    
    $('main').empty();
	var mainEl = document.querySelector('main');
    mainEl.classList.add('track-main')
	console.log(trackInfoArr);
	console.log(trackInfoArr[0].artists[0].name)
	for (i=0; i<trackInfoArr.length; i++){
	//creates card. adds track name(with anchor link to spotify url), adds artist name, adds album name, adds duration, MAYBE album cover, MAYBE preview.
        var trackCard = document.createElement('div');
        trackCard.innerHTML = '<div class="grid-x grid-padding-x align-center"><div class="cell shrink"><img src="'
        + trackInfoArr[i].album.images[1].url   +
        '" alt="Album art" height="64" width="64"></div><div class="cell auto"><h2>'
        + trackInfoArr[i].name +
        '</h2><p>'+
        trackInfoArr[i].artists[0].name+
        '</p><p>'+
        trackInfoArr[i].album.name+
        '</p><p>'+
        millisToMinutesAndSeconds(trackInfoArr[i].duration_ms)+
        '</p></div><div class="cell shrink"><i class="material-icons"><a href="'
        +trackInfoArr[i].external_urls.spotify+
        '"target="_blank">play_circle_filled</i></a></div></div>'

        mainEl.appendChild(trackCard);
	};

};

getParameters();