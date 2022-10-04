import React from "react";
import './column.css'
import Event from "../event/event";
import { agrementEventsData, computeEventTop, computeGlobalProportions, getHourSheet,  sortEventsByEndingLatest } from "../../helpers/data";
import Hour from "../hour/hour";


const Column = ({first, events}) => {
  const sortedEvents =  sortEventsByEndingLatest(events)
  const hourSheet = getHourSheet(sortedEvents)
  const agrementedEvents = agrementEventsData(sortedEvents)
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
    {agrementedEvents.map ((event) =>
        <Event key={event.id}
        id={event.id}
        duration={event.duration}
        start={event.start}
        top={computeEventTop(event, agrementedEvents[0].start, globalProportions)}
        proportion={computeGlobalProportions(hourSheet)}
        width={event.width}
        widthRatio={event.widthRatio}
        left={event.width === 1 ? 0 : (event.position / event.width)* 100}
        right={event.width === 1 && 0}
      />
      )
    }
  </div>)
}

export default Column;
