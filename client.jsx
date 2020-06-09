import React from "react";
import ReactDom from "react-dom";
import "regenerator-runtime/runtime"; //import regeneratorRuntime from "regenerator-runtime";
import YtsFinder from "./page/YtsFinder";

ReactDom.render(
  <>
    <YtsFinder />
  </>,
  document.querySelector("#root")
);
