import React from "react";

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
        {optionList.map((item, i) => {
          return (
            <div
              key={i}
              query_option={queryOption}
              option_value={item}
              onClick={onClickEvent}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialogOption;
