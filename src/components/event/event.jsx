import React from "react";
import './event.css'

const Event = ({duration, start, id, top, width, left, right, proportion, widthRatio}) => (
  <div
    className="event"
    style={{
      height: `${proportion/60*duration}%`,
      width: `${widthRatio/width*100}%`,
      backgroundColor: '#f7f7d5',
      position: 'fixed',
      top : `${top}%`,
      left: `${left}%`,
      right: `${right}`
    }}
  >
    {id}
  </div>
);


export default Event;
