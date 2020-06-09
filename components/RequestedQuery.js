import React, { useCallback } from "react";
import { SET_OPTION_REQUEST } from "../page/YtsFinder";

const RequestedQuery = ({ requestQuery, dispatch }) => {
  let arr = [];
  if (requestQuery) {
    Object.keys(requestQuery).forEach((key) => {
      arr.push([key, requestQuery[key]]);
    });
  }

  const onClickInit = useCallback(() => {
    dispatch({ type: SET_OPTION_REQUEST, data: { init: true } });
  });

  return (
    <div className="requested-query-container">
      {requestQuery ? (
        arr.map((v) => {
          return (
            <div key={v[0]} className="requested-query clickable">
              <div className="requested-query-key">{v[0]}</div>
              <div className="requested-query-value">{v[1]}</div>
            </div>
          );
        })
      ) : (
        <div className="requested-query">
          <div className="requested-query-key">검색 조건 없음</div>
          <div className="requested-query-value"></div>
        </div>
      )}

      {requestQuery && (
        <div
          className="requested-query init-query clickable"
          onClick={onClickInit}
        >
          <div>⟲</div>
        </div>
      )}
    </div>
  );
};

export default RequestedQuery;
