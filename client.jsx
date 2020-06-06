import React from "react";
import ReactDom from "react-dom";
import "regenerator-runtime/runtime"; //import regeneratorRuntime from "regenerator-runtime";
import Header from "./Header";
import MovieList from "./MovieList";

ReactDom.render(
  <>
    <Header />
    <MovieList />
  </>,
  document.querySelector("#root")
);
