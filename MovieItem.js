import React from "react";

const MovieItem = ({ data, onClickEvent }) => {
  //console.log("data", data);
  let genres = "";
  data.genres.forEach((v, i) => {
    if (i != 0) genres += ", ";
    genres += v;
  });
  return (
    <div className="movie" onClick={onClickEvent} data={JSON.stringify(data)}>
      <div className="movie-data-1">
        <img src={`${data.medium_cover_image}`}></img>
        <h2>{`${data.rating}`}</h2>
      </div>
      <div className="movie-data-2">
        <h2>{`${data.title}`}</h2>
        <h4>{`${data.year}`}</h4>
        <h6>{genres}</h6>
        <p>{`${data.summary.slice(0, 180)}`}...</p>
      </div>
    </div>
  );
};

export default MovieItem;
