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

export const INIT_QUERY = "INIT_QUERY";
export const ADD_QUERY_PARAM = "ADD_QUERY_PARAM";
export const DELETE_QUERY_PARAM = "DELETE_QUERY_PARAM";
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
    case INIT_QUERY: {
      return {
        ...state,
        requestUrl: DEFAULT_QUERY,
        requestQuery: null,
      };
    }
    case ADD_QUERY_PARAM: {
      const params = getQueryParams(state.requestUrl);
      delete params.page;
      params[action.addParam.key] = action.addParam.value;

      return {
        ...state,
        requestUrl: DEFAULT_QUERY + "?" + queryParamsToString(params),
        requestQuery: params,
      };
    }
    case DELETE_QUERY_PARAM: {
      const params = getQueryParams(state.requestUrl);
      delete params.page;
      delete params[action.deleteParamKey];

      const isEmptyQuery =
        Object.keys(params).length === 0 && params.constructor === Object;

      return {
        ...state,
        requestUrl: isEmptyQuery
          ? DEFAULT_QUERY
          : DEFAULT_QUERY + "?" + queryParamsToString(params),
        requestQuery: isEmptyQuery ? null : params,
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
