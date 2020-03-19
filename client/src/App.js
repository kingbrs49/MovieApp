import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home"
import API from "./utils/API";
import Wrapper from "./Components/Wrapper";
import ShowSearch from "./Pages/ShowSearch";
import Save from "./Pages/Save";
import MovieSearch from "./Pages/MovieSearch";
import SearchContext from './utils/SearchContext';
import NavBar from './Components/NavBar';



function App() {

  const [state, setState] = useState({
    // filter= "",
    saved: false,
    flipped: false,
    movieSearch: "",
    showSearch: "",
    trending:[],
    movie: [],
    show: {},
    moreInfo: "",
    streaming: [],
    savedShows: []
  })

  useEffect(() => {
    saveCard()
    loadTrending()
  }, []);
  
  useEffect(() => {
    if (state.saved === true) {
      saveCardShow()
    }
  }, [state.saved])

  useEffect(() => {
    if (state.show) {
      getStreamingServices(state.showSearch)
    }
  }, [state.show])

  useEffect(() => {
    if (state.movie) {
      getStreamingServices(state.movieSearch)
    }
  }, [state.movie])

  useEffect(() => {
    getShowsSaved()
  }, [])

  const handleInputChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value)
    console.log(event.target.value)
    setState({ ...state, showSearch: event.target.value })
    // console.log(state.showSearch)
  }

  const handleInputChangeMovies = (event) => {
    event.preventDefault();
    setState({ ...state, movieSearch: event.target.value })
    // console.log(state.showSearch)
  };

  const handleSubmitShows = (event) => {
    event.preventDefault();
    console.log(state.showSearch)
    API.getShows(state.showSearch)
      .then(res => {
        console.log(res.data)
        setState({ ...state, show: res.data })
      }
      )
      .catch(err => console.log(err));
  }

  const getStreamingServices = (query) => {
    API.getStreaming(query)
      .then(res => {
        console.log("Streaming data:", res.data)
        setState({ ...state, streaming: res.data })
        console.log("streaming state:", state.streaming)
      })
  }

 // Call Movie API from the backend through Utils folder
  const handleSubmitMovies = (event) => {
    event.preventDefault();
      API.getMovies(state.movieSearch)
        .then(res => {
          // console.log(res.data)
          setState({ ...state, movie: res.data })
        }
        )
        .catch(err => console.log(err));
  }


  const getShowsSaved = async () => {
    await API.getSavedShows()
      .then(res => {
        console.log("data of saved shows: ", res.data)
        setState({ ...state, savedShows: res.data })
      })
  }
  const getStreamingServices = (query) => {
    API.getStreaming(query)
      .then(res => {
        console.log("Streaming data:", res.data)
        setState({ ...state, streaming: res.data })
        console.log("streaming state:", state.streaming)
      })
  }

  // Gather more information on the movie cards
  // const handleSubmitMoreInfo = (event) => {
  //   event.preventDefault();
     
  //     API.getMoreInfo(state.moreInfo)
  //     .then(res => {
  //       console.log(res.data)
  //       setState({ ...state, moreInfo:  res.data})
  //     }
  //     )
  //     .catch(err => console.log(err));
  // }

 //Set the trending movies/ shows on the home page
 function loadTrending() {
  API.getTrending(state.trending)
  .then(res => {
    // console.log(res.data)
    setState({ ...state, trending: res.data })
  }
  )
  .catch(err => console.log(err));
 } 

  
  const flip = () => {
    setState({ ...state, flipped: !state.flipped });
  }

  const saveCard = ( title, titleS, overview, airedDate, released, rating, image) => {
    var cardData = {
      title: title,
      titleS: titleS,
      overview: overview,
      airedDate: airedDate,
      released: released,
      rating: rating,
      image: image
    }
    console.log(cardData)
    API.saveMovieCard(cardData).then()
  }

  const saveCardShow = (id, image, title, creators, summary) => {
    console.log(`Card ID: ${id}`)
    console.log(`Card Title: ${title}`)
    console.log(`Card Summary: ${summary}`)
    console.log(`Card Creators: ${creators}`)
    //create filter if/then that filters card based on whether it's a movie or show
    //if movie: set up cardData to match movieSchema
    //if show:set up cardData to match showSchema
    // call appropriate functions based on filter 
    var cardData= {
      title:title,
      imageUrl: image,
    creator: creators,
    synopsis: summary
    }
    API.saveShowCard(cardData).then()
  }
  
  return (
    <SearchContext.Provider value={{ ...state, handleSubmitShows, handleSubmitMovies, handleInputChange, handleInputChangeMovies, flip, saveCardShow, getStreamingServices, getShowsSaved,saveCard }}>
      <Router>
        <div className="page-container">
          <NavBar />
          <Wrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/shows" component={ShowSearch} />
            <Route exact path="/save" component={Save} />
            <Route exact path="/movies" component={MovieSearch} />
          </Wrapper>
        </div>
      </Router>
    </SearchContext.Provider>
  )
}

export default App;
