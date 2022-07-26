import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films");
      if (!res.ok) {
        throw new Error("Some thing went Wrong! ...Retrying ");
      }
      const data = await res.json();
      const tranformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(tranformedMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  return (
    <React.Fragment>
      <section>
        <Form />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !isError && movies.length == 0 && <h2>No Movies found</h2>}
        {isLoading ? (
          <h2>Extracting your information...</h2>
        ) : (
          <MoviesList movies={movies} />
        )}
        {!isLoading && isError && <h2>{isError}</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
