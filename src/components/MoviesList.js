import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  async function deleteHandler(id) {
    try {
      const response = await fetch(
        `https://react-http-2210-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );
      console.log("movies deleted");
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
    props.getMovies();
  }
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <React.Fragment>
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.date}
            openingText={movie.desc}
          />
          <button
            key={`Button ${movie.id}`}
            onClick={deleteHandler.bind(null, movie.id)}
          >{`Delete ${movie.title} from list`}</button>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MovieList;
