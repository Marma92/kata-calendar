import React from "react";
import './column.css'
import Event from "../event/event";
import { computeEventPosition, computeEventsWidth, computeGlobalProportions, getHourSheet,  sortEventsByEndingLatest,  sortEventsByLatest, sortEventsByStartingLatest } from "../../helpers/data";
import Hour from "../hour/hour";


const Column = ({first, events}) => {
  const hourSheet = getHourSheet(sortEventsByEndingLatest(events))
  const sortedEvents = computeEventsWidth(sortEventsByStartingLatest(events))
  console.log(sortedEvents)

  const globalProportions = computeGlobalProportions(hourSheet)


  return(first
  ?
  <div className="firstColumn">
    {hourSheet.map((hour) =>
      <Hour hour={hour} proportion={globalProportions}/>
    )}
  </div>
  :
  <div className="column">
    {sortedEvents.map ((event) =>
      <Event key={event.id}
        id={event.id}
        duration={event.duration}
        start={event.start}
        position={computeEventPosition(event, sortedEvents[0].start, globalProportions)}
        proportion={computeGlobalProportions(hourSheet)}
        width={100/event.cropFactor}
        left={(event.leftFactor > 1)? 100/event.leftFactor : 0}
      />
    )}
  </div>)
}

export default Column;
