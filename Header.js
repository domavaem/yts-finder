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

  const onClickOption = (e) => {
    const query_option = e.target.getAttribute("query_option");
    const option_value = e.target.getAttribute("option_value");
    dispatch({
      type: SET_OPTION_REQUEST,
      data: { queryOption: query_option, optionValue: option_value },
    });

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
        <div>YTS Finder</div>
        <button className="find" onClick={onClickInitFind}>
          검색 초기화
        </button>
      </div>

      <div className="request-option-bar">
        <button className="request-option" onClick={setQuality}>
          해상도quality
        </button>
        <button className="request-option" onClick={setMinimumRating}>
          최소 n평점 이상minimum_rating
        </button>
        <button className="request-option" onClick={setQueryTerm}>
          검색query_term
        </button>
        <button className="request-option" onClick={setGenre}>
          장르genre
        </button>
        <button className="request-option" onClick={setSortBy}>
          정렬sort_by
        </button>
        <button className="request-option" onClick={setOrderBy}>
          정렬순서order_by
        </button>
        <button className="request-option" onClick={setWithRtRatings}>
          로튼토마토 순위with_rt_ratings
        </button>
      </div>

      <DialogOption
        id="dialogQuality"
        hidden={quality}
        queryOption="quality"
        optionList={menuQuality}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogMinimumRating"
        hidden={minimumRating}
        queryOption="minimum_rating"
        optionList={menuMinimumRating}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogQueryTerm"
        hidden={queryTerm}
        queryOption="query_term"
        optionList={menuQueryTerm}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogGenre"
        hidden={genre}
        queryOption="genre"
        optionList={menuGenre}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogSortBy"
        hidden={sortBy}
        queryOption="sort_by"
        optionList={menuSortBy}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogOrderBy"
        hidden={orderBy}
        queryOption="order_by"
        optionList={menuOrderBy}
        onClickEvent={onClickOption}
      />
      <DialogOption
        id="dialogWithRtRatings"
        hidden={withRtRatings}
        queryOption="with_rt_ratings"
        optionList={menuWithRtRatings}
        onClickEvent={onClickOption}
      />
    </>
  );
};

export default Header;
