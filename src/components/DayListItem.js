import React from 'react';
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  return (
    <li className={dayClass} data-testid="day" onClick={()=> props.setDay(props.name)} selected={props.selected}>
    <h2>{props.name}</h2> 
    {props.spots === 1 && <h3>{props.spots} spot remaining</h3>}
    {props.spots === 0 && <h3>no spots remaining</h3>}
    {props.spots > 1 && <h3>{props.spots} spots remaining</h3>}
    
  </li>

  );
}