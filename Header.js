import React from "react";

const Header = () => {
  return (
    <>
      <div className="header">
        <div>Header</div>
        <button className="find">Find</button>
      </div>

      <div className="request-option-bar">
        <button className="request-option">quality</button>
        <button className="request-option">minimum_rating</button>
        <button className="request-option">query_term</button>
        <button className="request-option">genre</button>
        <button className="request-option">sort_by</button>
        <button className="request-option">order_by</button>
        <button className="request-option">with_rt_ratings</button>
      </div>
    </>
  );
};

export default Header;
