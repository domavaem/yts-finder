import React, { useReducer } from "react";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import DialogMovie from "../components/DialogMovie";
import RequestedQuery from "../components/RequestedQuery";

const DEFAULT_QUERY = "https://yts-proxy.now.sh/list_movies.json";

const initialState = {
  requestUrl: DEFAULT_QUERY,
  requestQuery: null,
  dialogMovieData: null,
};

export const SET_OPTION_REQUEST = "SET_OPTION_REQUEST";
export const LOAD_MOVIES = "LOAD_MOVIES";
export const SHOW_MOVIE_DIALOG = "SHOW_MOVIE_DIALOG";
export const HIDE_MOVIE_DIALOG = "HIDE_MOVIE_DIALOG";

const getQueryParams = (url) => {
  const temp = url.split("?");
  const query = temp[1];

  let result = {};
  if (query) {
    const queryArray = query.split("&");
    queryArray.forEach((q) => {
      const param = q.split("=");
      result[param[0]] = param[1];
    });
  }

  return result;
};

const queryParamsToString = (params) => {
  let queryUrl = "";
  Object.keys(params).forEach((v, i) => {
    if (i > 0) queryUrl += "&";
    queryUrl += v + "=" + params[v];
  });

  return queryUrl;
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_OPTION_REQUEST: {
      let requestUrl = null;
      let requestQuery = null;
      if (!action.data.init) {
        const params = getQueryParams(state.requestUrl);
        delete params.page;
        params[action.data.queryOption] = action.data.optionValue;

        requestQuery = params;
        requestUrl = DEFAULT_QUERY + "?" + queryParamsToString(params);
      } else {
        requestUrl = DEFAULT_QUERY;
      }

      return {
        ...state,
        requestUrl: requestUrl,
        requestQuery: requestQuery,
      };
    }
    case LOAD_MOVIES: {
      const params = getQueryParams(state.requestUrl);
      delete params.page;
      params["page"] = action.requestPage;

      return {
        ...state,
        requestUrl: DEFAULT_QUERY + "?" + queryParamsToString(params),
      };
    }

    case SHOW_MOVIE_DIALOG: {
      return { ...state, dialogMovieData: action.data };
    }

    case HIDE_MOVIE_DIALOG: {
      return { ...state, dialogMovieData: null };
    }

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
      <RequestedQuery requestQuery={requestQuery} dispatch={dispatch} />
      <MovieList requestUrl={requestUrl} dispatch={dispatch} />
      {dialogMovieData && (
        <DialogMovie data={dialogMovieData} dispatch={dispatch} />
      )}
    </>
  );
};

export default YtsFinder;
