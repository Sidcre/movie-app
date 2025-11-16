import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';

const App=()=>{
  const [searchValue,setSearchValue]=useState('');
  const [movies,setMovies]=useState([]);
  const [favourite,setFavourite]=useState([]);
  const [isfavourite,setIsFavourite]=useState(false);
  const getMovieRequest= async(searchValue)=>{
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`;

    const response=await fetch(url);
    const responseJson=await response.json();
    if(responseJson.Search)
    {
      setMovies(responseJson.Search);
    }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('react-movie-app-favourites')))
    {
      const movieFavourite=JSON.parse(localStorage.getItem('react-movie-app-favourites'));
      setFavourite(movieFavourite);  
    }
    
  },[]);

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
  };

  const addFavouriteMovie=(movie)=>{
    const newFavouriteList=[...favourite,movie];
    for(let i=0;i<favourite.length;i++)
      {
        if(favourite[i].imdbID==movie.imdbID)
        {

        }
        else
        {
          setFavourite(newFavouriteList);
        }
      }
      saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie=(movie)=>{
    const newFavouriteList=favourite.filter((favourite)=>favourite.imdbID!==movie.imdbID);
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  return(
    <>
    <header className='mt-4'>
          <MovieListHeading heading="Movies"/>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </header>
    <hr/>
    <div className='container-fluid movie-app'>
      <div className='row'>
          <MovieList movies={movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent={AddFavorite}/>
      </div>
      <header className='mt-4'>
          <MovieListHeading heading="Favourites"/>
      </header>
      <div className='row'>
          <MovieList movies={favourite} handleFavouriteClick={removeFavouriteMovie} favouriteComponent={RemoveFavourite}/>
      </div>
    </div>
    </>
  );
};


export default App;