
var locationSubmitBtn = $('#location-submit-btn');
var locationStartInput = $('#start');
var locationEndInput= $('#end');
var playlistForm = $('#playlist-form')

var enterArtistLabel =  document.createElement('label');
var enterArtist = document.createElement('input')
var generatePlaylistBtn = document.createElement('button');


function handleLocationSubmitBtn(event) {
	event.preventDefault();
	console.log('click');
	var locationStart = locationStartInput.val().trim();
	var locationEnd =locationEndInput.val().trim();
	console.log(locationStart);
	console.log(locationEnd);
	if (locationStart && locationEnd) {
		getTravelDuration(locationStart,locationEnd);
		getPlaylistForm();
	} else {
		alert('Please fill out both locations')
	};
};

function getTravelDuration(start,end) {
	console.log(start);
	console.log(end);
	
	fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/-84.518641,39.134270;-84.512023,39.102779?access_token=sk.eyJ1IjoiY2hyaXMtbm9yaWVnYTE0IiwiYSI6ImNrdWN2M2w4bDE0Y3kybm84amVkMzR3NDIifQ.nM00G_PKCkpIF9tzwK9kDA")
	.then(response => {
		return(response.json());
	})
	.then(function(data){
		console.log(data)
	})
	.catch(err => {
		console.error(err);
	});
};

function getPlaylistForm() {

	enterArtistLabel.textContent = 'Enter an artist:';
	enterArtist.value = 'Artist name';
	generatePlaylistBtn.textContent = 'Generate Playlist';

	enterArtist.setAttribute('type','text')
	generatePlaylistBtn.classList.add("button")
	generatePlaylistBtn.classList.add("medium-6")
	generatePlaylistBtn.classList.add("cell")

	playlistForm.append(enterArtistLabel);
	enterArtistLabel.append(enterArtist);
	playlistForm.append(generatePlaylistBtn);

};

function handleGeneratePlaylistBtn(event) {
	event.preventDefault();
	query = enterArtist.value;
	spotifyFetch(query);
};
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
				getTracks(data)//passes data to next function

			})
			// .catch(err => {
			// 	console.error(err);
			// });
			
};

function getTracks(data){
	var totalDuration = 0;
	var tripDuration;
	for (i=0; totalDuration<tripDuration; i++) {
		console.log(data.Results[i].duration_ms,data.Results[i].name);
		totalDuration += data.Results[i].duration_ms;
		console.log(totalDuration)
	};
};

locationSubmitBtn.on('click',handleLocationSubmitBtn);
generatePlaylistBtn.addEventListener('click',handleGeneratePlaylistBtn);

