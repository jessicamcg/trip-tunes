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
		getCoordinates(locationStart);
		getCoordinates(locationEnd);
		getPlaylistForm();
	} else {
		alert('Please fill out both locations')
	};
};

function getCoordinates(start) {
	fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + start + ".json?&limit=1&access_token=sk.eyJ1IjoiY2hyaXMtbm9yaWVnYTE0IiwiYSI6ImNrdWN2M2w4bDE0Y3kybm84amVkMzR3NDIifQ.nM00G_PKCkpIF9tzwK9kDA")
    .then(response => {
		return(response.json());
	})
	.then(function(data){
		if (startCoord == undefined) {
			startCoord = data.features[0].geometry.coordinates[0]+','+data.features[0].geometry.coordinates[1];
		} else {
			endCoord = data.features[0].geometry.coordinates[0]+','+data.features[0].geometry.coordinates[1];
        	getTravelDuration( startCoord,endCoord );
		};
	})
	.catch(err => {
		alert( "City name not found. Please enter a valid city." );
	});
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

	// something to redirect to new page
	$(function () {
		if (artistNames.includes(query)) {
			return;
		};
		artistNames.push(query);
		localStorage.setItem('artistNames',JSON.stringify(artistNames));
	});
};


locationSubmitBtn.on('click',handleLocationSubmitBtn);
generatePlaylistBtn.addEventListener('click',handleGeneratePlaylistBtn);

init();