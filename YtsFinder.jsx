import React, { useReducer } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import DialogMovie from "./components/DialogMovie";

const DEFAULT_QUERY = "https://yts-proxy.now.sh/list_movies.json";

const initialState = {
  requestUrl: DEFAULT_QUERY,
  dialogMovieData: null,
};

export const SET_OPTION_REQUEST = "SET_OPTION_REQUEST";
export const SHOW_MOVIE_DIALOG = "SHOW_MOVIE_DIALOG";
export const HIDE_MOVIE_DIALOG = "HIDE_MOVIE_DIALOG";

const getQuery = (currentQuery, data) => {
  const temp = currentQuery.split("?");
  const query = temp[1];
  let queryUrl = "";
  if (query) {
    const queryArray = query.split("&");
    queryArray.forEach((q) => {
      const queryInfo = q.split("=");
      const queryName = queryInfo[0];
      const queryValue = queryInfo[1];
      if (queryName !== data.queryOption) {
        queryUrl += queryName + "=" + queryValue + "&";
      }
    });
  }

  queryUrl += data.queryOption + "=" + data.optionValue;

  return queryUrl;
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_OPTION_REQUEST:
      let requestUrl = null;
      if (!action.data.init) {
        const newQuery = getQuery(state.requestUrl, action.data);
        requestUrl = DEFAULT_QUERY + "?" + newQuery;
      } else {
        requestUrl = DEFAULT_QUERY;
      }

      return {
        ...state,
        requestUrl: requestUrl,
      };

    case SHOW_MOVIE_DIALOG:
      return { ...state, dialogMovieData: action.data };

    case HIDE_MOVIE_DIALOG:
      return { ...state, dialogMovieData: null };

    default:
      return state;
  }
};

const YtsFinder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { requestUrl, dialogMovieData } = state;

  return (
    <>
      <Header dispatch={dispatch} />
      <MovieList requestUrl={requestUrl} dispatch={dispatch} />
      {dialogMovieData && (
        <DialogMovie data={dialogMovieData} dispatch={dispatch} />
      )}
    </>
  );
};

export default YtsFinder;
