# Trip Tunes
TripTunes is a versatile web application that generates a playlist based off of the user’s preferred artist and trip duration.  The webpage also allows you to save the generated playlist in Spotify to save the playlist.

## Note 
As of 11/24/2021 the Spotify API in use is no longer available. We are working to convert to a new API.

## Collaborators 
[Jessica Guico](https://github.com/jessicamcg)
[Nick Margaritondo](https://github.com/Nickm615)
[Chris Noriega](https://github.com/chris-noriega14)

## Description

Upon initial page load the user is presented with an input form prompting the user to enter a start location and an end location.

After the user enters their desired locations, another input form pops up for the user to enter an artist to center their playlist around.

After the user clicks the 'Generate Playlist" button, the user is redirected to another page that renders a tracklist and a textarea that the user can copy and paste directly into the official spotify app. 

The play button icons are clickable and redirects the user to the official track on spotify.

The tracks are rendered on card that contain the album artwork, track name, artist, abum and track length.

Appropriate error messages render on screen when the user enters invalid data or when the trip is too long and the API caps their data response.

## Technologies Used

CSS Framework: Foundation
JQuery
Unofficial Spotify API
Mapbox Directions Matrix API
Mapbox Geocoding API
Google Icon Fonts

![Mobile first function](https://github.com/jessicamcg/trip-tunes/blob/main/assets/project-one-gifs/project-one-mobile-view.gif)

![Full browser function](https://github.com/jessicamcg/trip-tunes/blob/main/assets/project-one-gifs/project-one-full-functionality.gif)

## Live Link 
https://jessicamcg.github.io/trip-tunes/
