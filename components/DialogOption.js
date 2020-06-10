import React from "react";
import { transToUIString } from "../util/helper";

const DialogOption = ({
  queryOption,
  optionList,
  id,
  hidden,
  onClickEvent,
  onClickClose,
}) => {
  return (
    <div
      id={id}
      style={{ display: hidden ? "none" : "block" }}
      className="modal"
      query_option={queryOption}
      onClick={onClickClose}
    >
      <div className="modal-content">
        <div className="query-param-key">{transToUIString(queryOption)}</div>
        {optionList.map((item, i) => {
          return (
            <div
              key={i}
              query_option={queryOption}
              option_value={item}
              onClick={onClickEvent}
              className="query-param-value"
            >
              {transToUIString(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialogOption;
