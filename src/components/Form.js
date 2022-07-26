import React from "react";
import "../App.css";
import "./Form.css";

const Form = (props) => {
  return (
    <form className="form" onSubmit={props.onClick}>
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
