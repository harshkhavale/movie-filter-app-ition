import React from 'react'
import Movie from './Movie'

const MovieList = ({listData}) => {
  return (
    <div className='flex flex-wrap justify-center '>
        {
            listData.map((movie,index)=>(
                <Movie key={movie.imdbmovieid} movie={movie}/>
            ))
        }
    </div>
  )
}

export default MovieList