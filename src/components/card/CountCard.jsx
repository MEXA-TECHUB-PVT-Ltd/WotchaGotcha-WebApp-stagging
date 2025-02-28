import React from "react";

const CountCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="count-card-container">
      <div className="count-icon-container">
        <Icon size={30} className="text-dark_bg_2 dark:text-dark_text_1" />
      </div>
      <p className="heading"> {value}</p>
      <h1 className="heading"> {title} </h1>
    </div>
  );
};

export default CountCard;
