import './App.css'
import React, { useEffect, useState } from 'react'
import MovieList from './Components/MovieList'
import Searchbar from './Components/Searchbar'
import MovieListHeading from './Components/MovieListHeading'
import RemoveFavourites from './Components/RemoveFavourites'
import AddFavourites from './Components/AddFavourites'


const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValues] = useState('')
  const [favourites, setFavourites] = useState([])

const getMovieRequest = async () => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=226b8d65`

  const response = await fetch(url)
  const responseJson = await response.json()

if(responseJson.Search) {
  setMovies(responseJson.Search)
}
} 

//Search movies 
useEffect(() => {
  getMovieRequest(searchValue)
}, [searchValue])

//Show saved movies from localstorage
useEffect(() => {
  const movieFavourite = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
  setFavourites(movieFavourite)
},[])

//Add Movies to favourites
const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie]
  setFavourites(newFavouriteList)
  saveMovies(newFavouriteList)
}

//Remove Movies from favourites
const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID)
      setFavourites(newFavouriteList)
}

//Save the movies to favourites(localstorage)
const saveMovies  = (items) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
}

  return (
    <div>
     
      <div className='row d-flex align-items-center mb-4 mb-4' id='topbar'>
        <MovieListHeading heading = 'Movie App' />
        <Searchbar 
            searchValue={searchValue} 
            setSearchValues={setSearchValues} />
      </div>

      <div className='movie-app'>
        <MovieList 
            movies = {movies}
            handleFavouritesClick = {addFavouriteMovie} 
            favouriteComponent = {AddFavourites} />       
      </div>

      <div className='row d-flex align-items-center mb-4 mb-4' id='favouritebar'>
        <MovieListHeading heading = 'Favourites' />
      </div>
      <div className='movie-app'>
        <MovieList
            movies = {favourites}
            handleFavouritesClick = {removeFavouriteMovie} 
            favouriteComponent = {RemoveFavourites} />       
      </div>
    </div>
  )
}

export default App
