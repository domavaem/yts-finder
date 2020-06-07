import React from "react";
const DialogMovie = ({ data }) => {
  return (
    <div>
      <div>{data.title}</div>
      <div>{data.rating}</div>
    </div>
  );
};

export default DialogMovie;
