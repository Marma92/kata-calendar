import React from "react";
import './calendar.css'
import Column from "../column/column";



const Calendar = ({events}) => {
  return(
    <div className="calendar">
    <Column first={true} events={events}/>
    <Column events={events}/>
  </div>
  )
}




export default Calendar;

