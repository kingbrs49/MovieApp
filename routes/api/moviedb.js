const router = require("express").Router();
var axios = require("../../models/node_modules/axios");
var keys = require("../../text")

const THEMOVIEDB_API_KEY = keys.theMovieDB.secret

var movieName = process.argv[2]

router.get("/movies", function(req, res) {
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + THEMOVIEDB_API_KEY + "&query=" + movieName).then(   
    function(res) {
        console.log (res.data)
    })
    .catch(function(error) {
        if (error.res) {
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    });
    res.json("yoyoyo")
})


module.exports = router