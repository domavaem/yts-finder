import React from "react";

const DialogOption = ({
  queryOption,
  optionList,
  id,
  hidden,
  onClickEvent,
}) => {
  return (
    <div id={id} hidden={hidden}>
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
  );
};

export default DialogOption;
