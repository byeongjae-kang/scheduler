import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

const formatSpots = (spots) => {
  if (spots === 1) {
    return `${spots} spot remaining`;
  }
  if (spots > 1) {
    return `${spots} spots remaining`;
  }

  return `no spots remaining`;
};

export default function DayListItem(props) {
  const listClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      className={listClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
