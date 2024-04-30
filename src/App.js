import MovieList from "./components/MovieList";
import { movieData } from "./constant";
import { useState } from "react";
import "./index.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Filters from "./components/Filters";
import { useMediaQuery } from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function App() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const languages = Array.from(
    new Set(movieData.flatMap((movie) => movie.movielanguages))
  );
  const countries = Array.from(
    new Set(movieData.flatMap((movie) => movie.moviecountries))
  );
  const genres = Array.from(
    new Set(movieData.flatMap((movie) => movie.moviegenres))
  );
  const [toggle, setToggle] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(movieData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = isNonMobileScreen?12:10;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleFilterChange = (selectedFilters) => {
    const filtered = movieData.filter((movie) => {
      const matchLanguages =
        selectedFilters.languages.length === 0 ||
        selectedFilters.languages.some((language) =>
          movie.movielanguages.includes(language)
        );

      const matchCountries =
        selectedFilters.countries.length === 0 ||
        selectedFilters.countries.some((country) =>
          movie.moviecountries.includes(country)
        );

      const matchGenres =
        selectedFilters.genres.length === 0 ||
        selectedFilters.genres.some((genre) =>
          movie.moviegenres.includes(genre)
        );

      return matchLanguages && matchCountries && matchGenres;
    });

    setFilteredMovies(filtered);
    setCurrentPage(1); 
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearchQuery(query);
    const filtered = movieData.filter(
      (movie) =>
        movie.movietitle &&
        movie.movietitle.trim().toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
    setCurrentPage(1); 
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMovies.length / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <header className="flex justify-between text-xs md:text-base p-4 items-center gap-2">
        <div className="logo flex justify-center items-center gap-2">
          <LocalMoviesRoundedIcon className=" md:h-6 md:w-6 h-4 w-4" />
          <p className=" font-bold md:text-2xl text-base ">Movie-App</p>
        </div>
        <div className="search flex items-center border-2 overflow-hidden rounded-2xl">
          <input
            type="text"
            placeholder="Finding a movie?"
            className="outline-none p-2 w-32 md:w-auto font-bold"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchRoundedIcon className="md:h-8 md:w-8 h-6 w-6 cursor-pointer rounded-full hover:bg-orange-400" />
        </div>
        {!isNonMobileScreen ? (
          !toggle ? (
            <MenuRoundedIcon
              onClick={() => {
                setToggle(true);
              }}
            />
          ) : (
            <CloseRoundedIcon
              onClick={() => {
                setToggle(false);
              }}
            />
          )
        ) : (
          ""
        )}
      </header>

      <main className="grid grid-cols-6">
        {isNonMobileScreen && (
          <div className="col-span-1">
            <Filters
              languages={languages}
              countries={countries}
              genres={genres}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        {!isNonMobileScreen && toggle && (
          <div className=" absolute right-0 z-50 bg-white">
            <Filters
              languages={languages}
              countries={countries}
              genres={genres}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        <div className="md:col-span-5 col-span-6">
          <MovieList listData={currentMovies} />
          <div className="pagination flex items-center justify-center gap-4 font-bold">
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => paginate(number)}
                className={`page-link font-bold cursor-pointer ${currentPage === number ? "active border-2  rounded-none p-2" : ""}`}
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
