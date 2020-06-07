import React, { useReducer } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import DialogMovie from "./components/DialogMovie";

const queryDefault = "https://yts-proxy.now.sh/list_movies.json";

const initialState = {
  queryRequest: queryDefault,
  dialogMovieData: null,
};

export const SET_OPTION_REQUEST = "SET_OPTION_REQUEST";
export const SHOW_MOVIE_DIALOG = "SHOW_MOVIE_DIALOG";

const getQuery = (currentQuery, data) => {
  const temp = currentQuery.split("?");
  const baseUrl = temp[0];
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

  //encodeURIComponent 검색어 인코딩 할 때 사용해야 함.

  return baseUrl + "?" + queryUrl;
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_OPTION_REQUEST:
      let queryRequest = null;
      if (!action.data.init) {
        queryRequest = getQuery(state.queryRequest, action.data);
      } else {
        queryRequest = queryDefault;
      }

      return {
        ...state,
        queryRequest: queryRequest,
      };

    case SHOW_MOVIE_DIALOG:
      return { ...state, dialogMovieData: action.data };
    default:
      return state;
  }
};

const YtsFinder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { queryRequest, dialogMovieData } = state;

  return (
    <>
      <Header dispatch={dispatch} />
      <MovieList queryRequest={queryRequest} dispatch={dispatch} />
      {dialogMovieData && <DialogMovie data={dialogMovieData} />}
    </>
  );
};

export default YtsFinder;
