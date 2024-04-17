import React, { useEffect, useState } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = "7e2d4ba2";
  const API_URL = `http://www.omdbapi.com/?apikey=7e2d4ba2&`;

  const fetchData = async () => {
    try {
      let response = await fetch(`${API_URL}`);
      response = await response.json();
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

  const handleSearch = async (search) => {
    try {
      let response = await fetch(`${API_URL}&t=${search}`);
      response = await response.json();
      console.log(response);
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

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //     if (searchQuery) {
  //       handleSearch(searchQuery);
  //     }
  //   }, [searchQuery]);

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
