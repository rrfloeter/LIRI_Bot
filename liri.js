
require("dotenv").config();
var keys = require("./keys.js")
var moment = require('moment');
// var Spotify = new Spotify(keys.spotify);

var axios = require("axios");
var action = process.argv[2];
var value = process.argv[3];

for (var i = 2; i < value.length; i++) {
    if (i > 2 && i < value.length) {

    }
}

switch (action) {
    case "movie-this":
        movie();
        break;

    case "concert-this":
        artist();
        break;

    case "spotify-this-song":
        song();
        break;

    case "do-what-it-says":
        says();
        break;
}

function movie() {
    var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(url);

    axios.get(url).then(
        function (response) {
            //title of the movie
            console.log("Title: " + response.data.Title);
            //year the movie came out
            console.log("Year: " + response.data.Year);
            //IMDB rating of the movie
            console.log("IMDB Rating: " + response.data.imdbRating);
            //rotten tomatoes rating of the movie
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            //country where the movie was produced
            console.log("Country: " + response.data.Country);
            //language of the movie
            console.log("Language: " + response.data.Language);
            //plot of the movie
            console.log("Plot: " + response.data.Plot);
            //actors in the movie
            console.log("Actors: " + response.data.Actors);
        }
    )
}

function artist() {
    var nodeArgs = process.argv;
    var ArtistName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            ArtistName = ArtistName + "+" + nodeArgs[i];
        }
        else {
            ArtistName += nodeArgs[i];
        }
    }
    axios.get("https://rest.bandsintown.com/artists/" + ArtistName + "/events?app_id=codingbootcamp").then(
        function (response) {
            //name of venue
            console.log(value + " is playing at " + response.data[0].venue.name);
            //venue location
            console.log("The concert is in " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
            //date of the event
            var date = response.data[0].datetime;
            console.log("The concert is on " + moment(date).format('L'));
        }
    )
}