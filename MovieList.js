import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { SHOW_MOVIE_DIALOG } from "./YtsFinder";
import { LOAD_MOVIES } from "./YtsFinder";

const MovieList = ({ requestUrl, dispatch }) => {
  const [movies, setMovies] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const totalCountMoviesRef = useRef(0);
  const currentCountMoviesRef = useRef(0);
  const currentPageRef = useRef(1);

  const requestListMovies = useCallback(async () => {
    console.log("> Request: " + requestUrl);

    if (requestUrl.includes("page") === false) {
      setMovies(null);
      currentPageRef.current = 1;
    }

    setShowLoading(true);

    try {
      const result = await axios.get(requestUrl);
      const data = result.data.data;
      totalCountMoviesRef.current = data.movie_count;
      currentPageRef.current = data.page_number;

      if (currentPageRef.current <= 1) {
        setMovies(data.movies);
        currentCountMoviesRef.current = data.movies.length;
      } else {
        const preMovies = [...movies];
        const newMovies = preMovies.concat(data.movies);
        setMovies(newMovies);
        currentCountMoviesRef.current += data.movies.length;
      }

      isLoadingRef.current = false;
    } catch (e) {
      console.error(e);
    }

    setShowLoading(false);
  });

  useEffect(() => {
    requestListMovies();
  }, [requestUrl]);

  const onClickItem = (e) => {
    const data = e.currentTarget.getAttribute("data");

    dispatch({
      type: SHOW_MOVIE_DIALOG,
      data: JSON.parse(data),
    });
  };

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (currentCountMoviesRef.current >= totalCountMoviesRef.current) return;
      if (isLoadingRef.current === true) return;

      isLoadingRef.current = true;
      dispatch({
        type: LOAD_MOVIES,
        requestPage: currentPageRef.current + 1,
      });
    }
  }, [
    currentCountMoviesRef.current,
    totalCountMoviesRef.current,
    currentPageRef.current,
    isLoadingRef.current,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [currentPageRef.current]);

  return (
    <>
      <div id="result-container">
        {movies &&
          movies.map((item) => {
            return (
              <MovieItem
                key={item.id.toString()}
                data={item}
                onClickEvent={onClickItem}
              />
            );
          })}
      </div>
      {showLoading && <div className="indicatorLoading">Loading...</div>}
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
