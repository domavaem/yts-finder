import React from "react";

const RequestedQuery = ({ requestQuery }) => {
  let arr = [];
  if (requestQuery) {
    Object.keys(requestQuery).forEach((key) => {
      arr.push([key, requestQuery[key]]);
    });
  }

  return (
    <div className="requested-query-container">
      {requestQuery ? (
        arr.map((v) => {
          return (
            <div key={v[0]} className="requested-query">
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
    </div>
  );
};

export default RequestedQuery;
