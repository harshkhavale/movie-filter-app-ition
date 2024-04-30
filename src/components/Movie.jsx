import React from 'react';

const Movie = ({ movie }) => {
  const getRandomColor = () => {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className='relative m-2 flex gap-2 flex-col md:w-[15rem] w-[10rem] shadow md:text-base text-xs rounded-2xl'>
      <img className='  object-cover' src={movie.moviemainphotos} alt={movie.movietitle} />
      <div className='p-2'>
      <p className=' font-bold uppercase'>{movie.movietitle}</p>
      <p className='font-bold'>available in </p>

      <div className=' flex items-center flex-wrap gap-1'>
        {movie.movielanguages.map((lang, index) => (
          <p className=' text-xs' key={index}>{lang},</p>
        ))}
      </div>
      <p className='font-bold'>movie genre</p>
      <div className='flex items-center m-1 flex-wrap gap-2'>
        {movie.moviegenres.map((genre, index) => (
          <p
            className='rounded-2xl p-1 text-xs font-bold text-white'
            key={index}
            style={{ backgroundColor: getRandomColor() }} // Apply random color
          >
            {genre}
          </p>
        ))}
      </div>
      <p className='font-bold'> in countries like, </p>

      <div className=' flex items-center flex-wrap gap-1'>
        {movie.moviecountries.map((lang, index) => (
          <p className=' text-xs' key={index}>{lang},</p>
        ))}
      </div>
      </div>
     
    </div>
  );
};

export default Movie;
