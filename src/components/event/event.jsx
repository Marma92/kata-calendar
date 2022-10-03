import React from "react";
import './event.css'

const Event = ({duration, start, id, position, width, left, proportion}) => (
  <div
    className="event"
    style={{
      height: `${proportion/60*duration}%`,
      width: `${width}%`,
      backgroundColor: '#f7f7d5',
      position: 'fixed',
      top : `${position}%`,
      left: `${left}%`,
    }}
  >
    {id}  {start}  {duration}
  </div>
);


export default Event;
