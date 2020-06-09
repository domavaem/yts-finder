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
        <div>{data.url}</div>
        <div>{data.year}</div>
        <div>{data.runtime}</div>
        <div>{data.genres}</div>
        <div>{data.description_full}</div>
        <div>{data.large_cover_image}</div>
        <div>{data.date_uploaded}</div>
      </div>
    </div>
  );
};

export default DialogMovie;

/**
id: 15553
url: https://yts.mx/movies/doctor-who-the-day-of-the-doctor-2013
imdb_code: tt2779318
title: Doctor Who The Day of the Doctor
title_english: Doctor Who The Day of the Doctor
title_long: Doctor Who The Day of the Doctor (2013)
slug: doctor-who-the-day-of-the-doctor-2013
year: 2013
rating: 9.4
runtime: 77
genres: Adventure,Drama,Family,Mystery,Sci-Fi
summary: In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.
description_full: In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.
synopsis: In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.
yt_trailer_code: Mkq8pnvsnQg
language: English
mpa_rating:
background_image: https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/background.jpg
background_image_original: https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/background.jpg
small_cover_image: https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/small-cover.jpg
medium_cover_image: https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/medium-cover.jpg
large_cover_image: https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/large-cover.jpg
state: ok
torrents: [object Object],[object Object]
date_uploaded: 2020-02-24 05:16:24
date_uploaded_unix: 1582517784
 */
