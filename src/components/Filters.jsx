import React, { useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import GrainRoundedIcon from '@mui/icons-material/GrainRounded';
const Filters = ({ languages, countries, genres, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    languages: [],
    countries: [],
    genres: [],
  });

  const [collapsed, setCollapsed] = useState({
    languages: false,
    countries: false,
    genres: false,
  });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleCollapse = (filterType) => {
    setCollapsed({ ...collapsed, [filterType]: !collapsed[filterType] });
  };

  return (
    <div className=' relative flex flex-col font-bold gap-2 min-h-screen items-center p-2 md:p-0'>
      <div className=' flex items-center gap-2 font-bold border-2 border-blue-500 text-blue-500 p-1 px-4 rounded-2xl'>
      <h2>apply Filters</h2><GrainRoundedIcon className=' h-4 w-4' />

      </div>
      <div>
        <h3 className='font-bold cursor-pointer flex items-center gap-2' onClick={() => toggleCollapse('languages')}>
          Languages <KeyboardArrowDownRoundedIcon className=' h-4 w-4'  />
        </h3>
        {!collapsed.languages && (
          <div>
            {languages.map((language) => (
              <label className=' font-bold flex gap-2' key={language}>
                <input
                  type="checkbox"
                  value={language}
                  checked={selectedFilters.languages.includes(language)}
                  onChange={(e) =>
                    handleFilterChange('languages', updateFilters(e, selectedFilters.languages))
                  }
                />
                {language}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className='font-bold cursor-pointer flex items-center gap-2' onClick={() => toggleCollapse('countries')}>
          Countries <KeyboardArrowDownRoundedIcon className=' h-4 w-4' />
        </h3>
        {!collapsed.countries && (
          <div>
            {countries.map((country) => (
              <label className=' font-bold flex gap-2' key={country}>
                <input
                  type="checkbox"
                  value={country}
                  checked={selectedFilters.countries.includes(country)}
                  onChange={(e) =>
                    handleFilterChange('countries', updateFilters(e, selectedFilters.countries))
                  }
                />
                {country}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className='font-bold cursor-pointer flex items-center gap-2' onClick={() => toggleCollapse('genres')}>
          Genres <KeyboardArrowDownRoundedIcon className=' h-4 w-4' alt="dropdown-img" />
        </h3>
        {!collapsed.genres && (
          <div>
            {genres.map((genre) => (
              <label className=' font-bold flex gap-2' key={genre}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedFilters.genres.includes(genre)}
                  onChange={(e) =>
                    handleFilterChange('genres', updateFilters(e, selectedFilters.genres))
                  }
                />
                {genre}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className=' absolute right-0 p-[0.5px] rounded-3xl min-h-screen bg-gray-300 h-full'></div>
    </div>
  );
};

const updateFilters = (event, currentFilters) => {
  const { value } = event.target;
  return event.target.checked
    ? [...currentFilters, value]
    : currentFilters.filter((filter) => filter !== value);
};

export default Filters;
