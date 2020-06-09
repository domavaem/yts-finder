import React, { useState, useCallback } from "react";
import DialogOption from "./components/DialogOption";
import { SET_OPTION_REQUEST } from "./YtsFinder";

const Header = ({ dispatch }) => {
  const useClick = (initValue = true) => {
    const [value, setValue] = useState(true);
    const onHandler = useCallback(() => {
      setValue(!value);
    });
    return [value, onHandler];
  };

  const [quality, setQuality] = useClick(true);
  const [minimumRating, setMinimumRating] = useClick(true);
  const [queryTerm, setQueryTerm] = useClick(true);
  const [genre, setGenre] = useClick(true);
  const [sortBy, setSortBy] = useClick(true);
  const [orderBy, setOrderBy] = useClick(true);
  const [withRtRatings, setWithRtRatings] = useClick(true);

  const onClickInitFind = () => {
    dispatch({ type: SET_OPTION_REQUEST, data: { init: true } });
  };

  const updateClick = (query_option) => {
    switch (query_option) {
      case "quality":
        setQuality();
        break;
      case "minimum_rating":
        setMinimumRating();
        break;
      case "query_term":
        setQueryTerm();
        break;
      case "genre":
        setGenre();
        break;
      case "sort_by":
        setSortBy();
        break;
      case "order_by":
        setOrderBy();
        break;
      case "with_rt_ratings":
        setWithRtRatings();
        break;

      default:
        break;
    }
  };

  const onClickClose = (e) => {
    const query_option = e.target.getAttribute("query_option");
    updateClick(query_option);
  };

  const onClickOption = (e) => {
    const query_option = e.target.getAttribute("query_option");
    const option_value = e.target.getAttribute("option_value");
    dispatch({
      type: SET_OPTION_REQUEST,
      data: { queryOption: query_option, optionValue: option_value },
    });

    updateClick(query_option);
  };

  const menuQuality = ["720p", "1080p", "2160p", "3D"];
  const menuMinimumRating = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const menuQueryTerm = ["temp", "temp2", "temp3"];
  const menuGenre = ["genre", "genre2", "genre3"];
  const menuSortBy = [
    "title",
    "year",
    "rating",
    "peers",
    "seeds",
    "download_count",
    "like_count",
    "date_added",
  ];
  const menuOrderBy = ["desc", "asc"];
  const menuWithRtRatings = ["true", "false"];

  return (
    <>
      <div className="header">
        <div className="brand">
          <div>YTS</div>
          <div>Finder</div>
        </div>
        <div className="find">
          <button onClick={onClickInitFind}>검색 초기화</button>
        </div>
      </div>

      <div className="request-option-bar">
        <button className="request-option" onClick={setGenre}>
          장르
        </button>
        <button className="request-option" onClick={setSortBy}>
          정렬 기준
        </button>
        <button className="request-option" onClick={setOrderBy}>
          정렬 순서
        </button>
        <button className="request-option" onClick={setMinimumRating}>
          최소 평점
        </button>
        <button className="request-option" onClick={setQuality}>
          해상도
        </button>
        {/* <button className="request-option" onClick={setWithRtRatings}>
          로튼토마토 평점 여부
        </button>
        <button className="request-option query-term" onClick={setQueryTerm}>
          검색
        </button> */}
      </div>

      <DialogOption
        id="dialogQuality"
        hidden={quality}
        queryOption="quality"
        optionList={menuQuality}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogMinimumRating"
        hidden={minimumRating}
        queryOption="minimum_rating"
        optionList={menuMinimumRating}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogQueryTerm"
        hidden={queryTerm}
        queryOption="query_term"
        optionList={menuQueryTerm}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogGenre"
        hidden={genre}
        queryOption="genre"
        optionList={menuGenre}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogSortBy"
        hidden={sortBy}
        queryOption="sort_by"
        optionList={menuSortBy}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogOrderBy"
        hidden={orderBy}
        queryOption="order_by"
        optionList={menuOrderBy}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
      <DialogOption
        id="dialogWithRtRatings"
        hidden={withRtRatings}
        queryOption="with_rt_ratings"
        optionList={menuWithRtRatings}
        onClickEvent={onClickOption}
        onClickClose={onClickClose}
      />
    </>
  );
};

export default Header;
