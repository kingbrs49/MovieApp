import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import API from "./utils/API";
// import Navbar from "./Components/Navbar"
import Wrapper from "./Components/Wrapper"
// import BlogCard from './Components/BlogCard/index.js';
import Search from "./Pages/Search"
import Save from "./Pages/Save"
import SearchContext from './utils/SearchContext';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [state, setState] = useState({
    movieSearch: "",
    showSearch: "",
    movie: {},
    show: {},
  })

  // useEffect(() => {
  //   loadShows()
  // }, [state.showSearch])


  const handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    setState({ ...state, showSearch: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    API.getShows(state.showSearch)
      .then(res => {

        setState({ ...state, show: res.data })
        console.log(res.data)
      }
      )
      .catch(err => console.log(err));
  }


  // const handleBtnClick = event => {
  //   console.log(state)
  // }
  return (
    <SearchContext.Provider value={{ ...state, handleSubmit, handleInputChange }}>
      <Router>
        <div>
          {/* <Navbar></Navbar> */}
          <Wrapper>
            <Route exact path="/" component={Search} />
            <Route exact path="/save" component={Save} />

          </Wrapper>
          {/* <Footer></Footer> */}
        </div>
      </Router>
    </SearchContext.Provider>
  )

}

export default App;