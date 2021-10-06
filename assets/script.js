
var locationSubmitBtn = $('#location-submit-btn');
var locationStartInput = $('#start');
var locationEndInput= $('#end');
var playlistForm = $('#playlist-form')

var enterArtistLabel =  document.createElement('label');
var enterArtist = document.createElement('input')
var generatePlaylistBtn = document.createElement('button');
var startCoord;
var endCoord;
var tripDuration;
var artistNames;

function init(){
	artistNames = JSON.parse(localStorage.getItem("artistNames"))||[];
}
function handleLocationSubmitBtn(event) {
	event.preventDefault();
	var locationStart = locationStartInput.val().trim();
	var locationEnd =locationEndInput.val().trim();
	if (locationStart && locationEnd) {
		$('main').addClass('main-transform');
		convertCityNametoCoord(locationStart);
		convertCityNametoCoord(locationEnd);
		getPlaylistForm();
	} else {
		alert('Please fill out both locations')
	};
};

function convertCityNametoCoord(city) {
	var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=4ff77886755c8b9237b9bb4bb1c1e2bf'

	$.ajax({
        url: requestUrl,
        method: 'GET',
        statusCode: {
            404: function() {
              alert( "City name not found. Please enter a valid city." );
            }
          }
    }).then(function (response) { 
		console.log(response);

		console.log(typeof response.coord.lat);
		console.log(response.coord.lat);
		if (startCoord == undefined) {
			startCoord = response.coord.lon+','+response.coord.lat;
		} else {
			endCoord = response.coord.lon+','+response.coord.lat;
        	getTravelDuration( startCoord,endCoord );
		};


	}).catch()

};

function getTravelDuration(start,end) {
	console.log(start,end);
	fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/"+start+";"+end+"?access_token=sk.eyJ1IjoiY2hyaXMtbm9yaWVnYTE0IiwiYSI6ImNrdWN2M2w4bDE0Y3kybm84amVkMzR3NDIifQ.nM00G_PKCkpIF9tzwK9kDA")
	.then(response => {
		return(response.json());
	})
	.then(function(data){
		console.log(data.durations[0][1]);
		tripDuration = data.durations[0][1];
	})
	.catch(err => {
		console.error(err);
	});
};

function getPlaylistForm() {

	enterArtistLabel.textContent = 'Enter an artist:';
	enterArtist.setAttribute('placeholder','Artist name') ;
	generatePlaylistBtn.textContent = 'Generate Playlist';

	enterArtist.setAttribute('id','input-artist');
	enterArtist.setAttribute('type','text')
	generatePlaylistBtn.classList.add("button")
	generatePlaylistBtn.classList.add("medium-6")
	generatePlaylistBtn.classList.add("cell")

	playlistForm.append(enterArtistLabel);
	enterArtistLabel.append(enterArtist);
	playlistForm.append(generatePlaylistBtn);
	$("#input-artist").autocomplete({
		source: artistNames,
	});
};

function handleGeneratePlaylistBtn(event) {
	event.preventDefault();
	query = enterArtist.value;
	console.log(tripDuration);
    
	var queryString = './track-results.html?duration=' + tripDuration + '&artist=' + query;

	location.assign(queryString);
	
	// spotifyFetch(query);

	// something to redirect to new page
	$(function () {
		artistNames.push(query);
		localStorage.setItem('artistNames',JSON.stringify(artistNames));
	});
};


locationSubmitBtn.on('click',handleLocationSubmitBtn);
generatePlaylistBtn.addEventListener('click',handleGeneratePlaylistBtn);

init();