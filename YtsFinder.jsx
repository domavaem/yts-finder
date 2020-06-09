import React, { useReducer } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import DialogMovie from "./components/DialogMovie";
import RequestedQuery from "./components/RequestedQuery";

const DEFAULT_QUERY = "https://yts-proxy.now.sh/list_movies.json";

const initialState = {
  requestUrl: DEFAULT_QUERY,
  requestQuery: null,
  dialogMovieData: null,
};

export const SET_OPTION_REQUEST = "SET_OPTION_REQUEST";
export const SHOW_MOVIE_DIALOG = "SHOW_MOVIE_DIALOG";
export const HIDE_MOVIE_DIALOG = "HIDE_MOVIE_DIALOG";

const getQueryInfo = (currentQuery, data) => {
  const temp = currentQuery.split("?");
  const query = temp[1];
  let queryUrl = "";
  let queryData = {};
  if (query) {
    const queryArray = query.split("&");
    queryArray.forEach((q) => {
      const queryInfo = q.split("=");
      const queryName = queryInfo[0];
      const queryValue = queryInfo[1];
      if (queryName !== data.queryOption) {
        queryUrl += queryName + "=" + queryValue + "&";
        queryData[queryName] = queryValue;
      }
    });
  }

  queryUrl += data.queryOption + "=" + data.optionValue;
  queryData[data.queryOption] = data.optionValue;

  return { queryUrl, queryData };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_OPTION_REQUEST:
      let requestUrl = null;
      let requestQuery = null;
      if (!action.data.init) {
        const { queryUrl, queryData } = getQueryInfo(
          state.requestUrl,
          action.data
        );
        requestQuery = queryData;
        requestUrl = DEFAULT_QUERY + "?" + queryUrl;
      } else {
        requestUrl = DEFAULT_QUERY;
      }

      return {
        ...state,
        requestUrl: requestUrl,
        requestQuery: requestQuery,
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
  const { requestUrl, requestQuery, dialogMovieData } = state;

  return (
    <>
      <Header dispatch={dispatch} />
      <RequestedQuery requestQuery={requestQuery} />
      <MovieList requestUrl={requestUrl} dispatch={dispatch} />
      {dialogMovieData && (
        <DialogMovie data={dialogMovieData} dispatch={dispatch} />
      )}
    </>
  );
};

export default YtsFinder;
