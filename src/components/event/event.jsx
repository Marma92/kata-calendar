import React from "react";
import './event.css'

const Event = ({duration, start, id, top, width, left, right, proportion, widthRatio}) => (
  <div
    className="event"
    style={{
      height: `${proportion/60*duration}%`,
      width: `${widthRatio/width*100}%`,
      top : `${top}%`,
      left: `${left}%`,
      right: `${right}`
    }}
  >
    {id} {start} {duration}
  </div>
);


export default Event;
