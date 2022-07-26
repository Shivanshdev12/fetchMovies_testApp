import React from "react";
import "../App.css";
import "./Form.css";

const Form = () => {
  const formHandler = (e) => {
    e.preventDefault();
    const NewMovieobj = {
      title: e.target[0].value,
      desc: e.target[1].value,
      date: e.target[2].value,
    };
    console.log(NewMovieobj);
  };
  return (
    <form className="form" onSubmit={formHandler}>
      <h3>Title</h3>
      <input type="text" name="title" />
      <h3>Opening Text</h3>
      <textarea name="opening" />
      <h3>Release Date</h3>
      <input type="date" name="releaseDate" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
