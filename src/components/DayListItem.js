import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';

export default function DayListItem({name, spots, selected, setDay}) {
  const dayClass = classNames('day-list__item',
    {'day-list__item--selected':selected,
     'day-list__item--full': spots===0
    })

  const formatSpots = (spots) => {
    if (spots === 0){
      return 'no spots remaining'
    } else if (spots === 1){
      return '1 spot remaining'
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} data-testid="day" onClick={()=> setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
