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
      const res = await fetch(
        "https://react-http-2210-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!res.ok) {
        throw new Error("Some thing went Wrong! ...Retrying ");
      }
      const data = await res.json();
      const LoadedMovies = [];
      for (const key in data) {
        LoadedMovies.push({
          id: key,
          title: data[key].title,
          desc: data[key].desc,
          date: data[key].date,
        });
      }
      setMovies(LoadedMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function formHandler(e) {
    e.preventDefault();
    const Movieobj = {
      title: e.target[0].value,
      desc: e.target[1].value,
      date: e.target[2].value,
    };
    await fetch(
      "https://react-http-2210-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(Movieobj),
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchMovieHandler();
  }

  return (
    <React.Fragment>
      <section>
        <Form onClick={formHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !isError && movies.length === 0 && <h2>No Movies found</h2>}
        {isLoading ? (
          <h2>Extracting your information...</h2>
        ) : (
          <MoviesList movies={movies} getMovies={fetchMovieHandler} />
        )}
        {!isLoading && isError && <h2>{isError}</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
