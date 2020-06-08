import React from "react";
import { HIDE_MOVIE_DIALOG } from "../YtsFinder";

const DialogMovie = ({ data, dispatch }) => {
  const onClickClose = (e) => {
    dispatch({
      type: HIDE_MOVIE_DIALOG,
    });
  };

  const onClickContent = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={{ display: "block" }} className="modal" onClick={onClickClose}>
      <div className="modal-content" onClick={onClickContent}>
        <div>{data.title}</div>
        <div>{data.rating}</div>
      </div>
    </div>
  );
};

export default DialogMovie;
