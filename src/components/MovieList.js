import React,{useState} from 'react';

const MovieList=(props)=>{
    const FavouriteComponent=props.favouriteComponent;
    return(
        <>
            {props.movies.map((movie,index)=>
                <div className='image-container d-flex justify-content-start'
                style={{ width: '200px', position: 'relative',margin:'12px' }}>
                    <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }}></img>
                    <div onClick={()=>props.handleFavouriteClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                    <FavouriteComponent/>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieList;