import React from "react";
import './hour.css'

const Hour = ({hour, proportion}) => (
  <div className="hour" style={{height: `${proportion}%`}}>
    {hour}:00
  </div>
);


export default Hour;
