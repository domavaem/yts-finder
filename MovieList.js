import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const requestListMovies = async (
    limit = 20,
    page = null,
    quality = null,
    minimum_rating = null,
    query_term = null,
    genre = null,
    sort_by = null,
    order_by = null,
    with_rt_ratings = null
  ) => {
    let queryString = "";
    if (limit) queryString += `limit=${limit}`;
    if (page) queryString += `&page=${page}`;
    if (quality) queryString += `&page=${quality}`;
    if (minimum_rating) queryString += `&page=${minimum_rating}`;
    if (query_term) queryString += `&page=${query_term}`;
    if (genre) queryString += `&page=${genre}`;
    if (sort_by) queryString += `&sort_by=${sort_by}`;
    if (order_by) queryString += `&order_by=${order_by}`;
    if (with_rt_ratings) queryString += `&page=${with_rt_ratings}`;
    console.log("> Query String: " + queryString);

    try {
      const result = await axios.get(
        "https://yts-proxy.now.sh/list_movies.json?" + queryString
      );

      const data = result.data.data;
      setMovies(data.movies);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    requestListMovies();
  }, []);

  return (
    <>
      <div id="result-container">
        {movies.map((item) => {
          return <MovieItem key={item.id.toString()} data={item} />;
        })}
      </div>
    </>
  );
};

export default MovieList;

// limit		        Integer between 1 - 50 (inclusive)	20	The limit of results per page that has been set
// page	        	Integer (Unsigned)	1	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
// quality		        String (720p, 1080p, 2160p, 3D)	All	Used to filter by a given quality
// minimum_rating		Integer between 0 - 9 (inclusive)	0	Used to filter movie by a given minimum IMDb rating
// query_term	    	String	0	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
// genre		        String	All	Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
// sort_by		        String (title, year, rating, peers, seeds, download_count, like_count, date_added)	date_added	Sorts the results by choosen value
// order_by	    	String (desc, asc)	desc	Orders the results by either Ascending or Descending order
// with_rt_ratings		Boolean	false	Returns the list with the Rotten Tomatoes rating included
