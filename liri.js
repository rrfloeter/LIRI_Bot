require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var action = process.argv[2];
var value = process.argv[3];


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


    if (movieName === "") {
        axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
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

    else {
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

    var Url = "https://rest.bandsintown.com/artists/" + ArtistName + "/events?app_id=codingbootcamp";
    console.log(Url);
    axios.get(Url).then(
        function (response) {
            //name of venue
            var place = value + " is playing at " + response.data[0].venue.name
            console.log(place);
            //venue location
            var location = "The concert is in " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country
            console.log(location);
            //date of the event
            var date = response.data[0].datetime;
            var datetime = "The concert is on " + moment(date).format('L');
            console.log(datetime);
        }
    )
}

function song() {
    var nodeArgs = process.argv;
    var SongName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            SongName = SongName + "+" + nodeArgs[i];
        }
        else {
            SongName += nodeArgs[i];
        }
    }

    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: SongName || 'Ace-of-Base', limit: 1 }, function (err, data) {
        if (err) {
            console.log("Uh-oh there was an error!");
        }

        SongName = "";

        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song Title: " + songData.name);
            console.log("Preview Track: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
        }
    });
}

function says() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        else {
            var dataarr = data.split(",");
            action = dataarr[0].trim();
            value = dataarr[1].trim();

            var Spotify = require('node-spotify-api');
            var keys = require("./keys.js");
            var spotify = new Spotify(keys.spotify);

            spotify.search({ type: 'track', query: value, limit: 1 }, function (err, data) {
                if (err) {
                    console.log("Uh-oh Error!");
                }

                value = "";
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name);
                    console.log("Song Title: " + songData.name);
                    console.log("Preview Track: " + songData.preview_url);
                    console.log("Album: " + songData.album.name);
                }
            });
        }
    });
} 