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
                let MovieTitle = ("Title: " + response.data.Title);
                let Year = ("Year: " + response.data.Year);
                let IMDB = ("IMDB Rating: " + response.data.imdbRating);
                let RT = ("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                let Country = ("Country: " + response.data.Country);
                let Language = ("Language: " + response.data.Language);
                let Plot = ("Plot: " + response.data.Plot);
                let Actors = ("Actors: " + response.data.Actors);
                //title of the movie
                console.log(MovieTitle);
                //year the movie came out
                console.log(Year);
                //IMDB rating of the movie
                console.log(IMDB);
                //rotten tomatoes rating of the movie
                console.log(RT);
                //country where the movie was produced
                console.log(Country);
                //language of the movie
                console.log(Language);
                //plot of the movie
                console.log(Plot);
                //actors in the movie
                console.log(Actors);

                var fs = require("fs");

                fs.appendFile("log.txt", MovieTitle, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("entry logged");
                });

                fs.appendFile("log.txt", Year, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", IMDB, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", RT, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Country, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Language, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Plot, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Actors, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        )
    }

    else {
        axios.get(url).then(
            function (response) {
                let MovieTitle = ("Title: " + response.data.Title);
                let Year = ("Year: " + response.data.Year);
                let IMDB = ("IMDB Rating: " + response.data.imdbRating);
                let RT = ("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                let Country = ("Country: " + response.data.Country);
                let Language = ("Language: " + response.data.Language);
                let Plot = ("Plot: " + response.data.Plot);
                let Actors = ("Actors: " + response.data.Actors);
                //title of the movie
                console.log(MovieTitle);
                //year the movie came out
                console.log(Year);
                //IMDB rating of the movie
                console.log(IMDB);
                //rotten tomatoes rating of the movie
                console.log(RT);
                //country where the movie was produced
                console.log(Country);
                //language of the movie
                console.log(Language);
                //plot of the movie
                console.log(Plot);
                //actors in the movie
                console.log(Actors);

                var fs = require("fs");

                fs.appendFile("log.txt", MovieTitle, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("entry logged");
                });

                fs.appendFile("log.txt", Year, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", IMDB, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", RT, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Country, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Language, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Plot, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                fs.appendFile("log.txt", Actors, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
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

            //log to log.txt
            var fs = require("fs");

            fs.appendFile("log.txt", place, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("entry logged");
            });

            fs.appendFile("log.txt", location, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.appendFile("log.txt", date, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.appendFile("log.txt", datetime, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
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
            let Artist = ("Artist: " + songData.artists[0].name);
            let Song = ("Song Title: " + songData.name);
            let Track = ("Preview Track: " + songData.preview_url);
            let Album = ("Album: " + songData.album.name);
            console.log(Artist);
            console.log(Song);
            console.log(Track);
            console.log(Album);

            var fs = require("fs");

            fs.appendFile("log.txt", Artist, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("entry logged");
            });

            fs.appendFile("log.txt", Song, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.appendFile("log.txt", Track, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.appendFile("log.txt", Album, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
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
                    let Artist = ("Artist: " + songData.artists[0].name);
                    let Song = ("Song Title: " + songData.name);
                    let Track = ("Preview Track: " + songData.preview_url);
                    let Album = ("Album: " + songData.album.name);
                    console.log(Artist);
                    console.log(Song);
                    console.log(Track);
                    console.log(Album);

                    fs.appendFile("log.txt", Artist, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("entry logged");
                    });

                    fs.appendFile("log.txt", Song, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

                    fs.appendFile("log.txt", Track, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

                    fs.appendFile("log.txt", Album, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            });
        }
    });
}

