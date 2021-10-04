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
};

function getPlaylistForm() {
	console.log('test');

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
	console.log('playlist test');
};

locationSubmitBtn.on('click',handleLocationSubmitBtn);
generatePlaylistBtn.addEventListener('click',handleGeneratePlaylistBtn);