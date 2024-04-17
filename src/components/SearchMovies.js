import React, { useState } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = "99eb9fd1";
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  const handleSearch = async () => {
    try {
      let response = await fetch(`${API_URL}&s=${searchQuery}`);
      response = response.json();
      if (response.data.Response === "True") {
        setSearchResults(response.data.Search);
        setErrorMessage("");
      } else {
        setSearchResults([]);
        setErrorMessage("Invalid movie name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
