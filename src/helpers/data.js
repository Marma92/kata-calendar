import _ from "lodash";
import moment, { duration } from 'moment';

export const sortEventsByEndingLatest = (events) => {
  return _.sortBy(events, [function(event){ return event.start+event.duration }] )
}

export const sortEventsByStartingLatest = (events) => {
  return _.sortBy(events, [function(event){ return event.start}] )
}

export const calendarTotalDuration = (sortedEvents) => {
  const start = new moment(sortedEvents[0].start, "HH:mm")

  const endTime = new moment(sortedEvents[sortedEvents.length-1].start, "HH:mm")
  endTime.add(sortedEvents[sortedEvents.length-1].duration, 'minutes')

  duration = endTime.diff(start)
  return moment.utc(duration).format("HH:mm")
}

export const getHourSheet = (sortedEvents) => {
  const sheet = []
  const start = parseInt(new moment(sortedEvents[0].start, "HH:mm").format("HH"))
  const end = new moment(calendarTotalDuration(sortedEvents), "HH:mm").add(1, "hours")
  const duration = parseInt(end.format("HH"))

  for (let i = 0; i <= duration; i++){
    sheet.push(start+i)
  }
  return sheet
}

export const computeGlobalProportions = (hourSheet) => {
  return 100/hourSheet.length
}

export const computeEventPosition = (event, scheduleOpening, globalProportions) => {
  const start = new moment(event.start, "HH:mm")
  const opening = new moment(scheduleOpening, "HH:mm")

  const duration = start.diff(opening)

  let eventPosition = parseInt(moment.utc(duration).format("HH"))
  eventPosition += parseInt(moment.utc(duration).format("mm"))/60
  eventPosition *= globalProportions

  return eventPosition
}

export const computeEventsWidth = (sortedEvents) => {
  const sortedEventsWithWidth = []
  for (let i = 0; i < sortedEvents.length; i++){
    sortedEventsWithWidth.push(sortedEvents[i])
    sortedEventsWithWidth[i].cropFactor = 1
    sortedEventsWithWidth[i].leftFactor = 0
    if (i > 1){
      const eventStart = new moment(sortedEvents[i].start, "HH:mm")


      const previousEventEndTime = new moment(sortedEventsWithWidth[i-1].start, "HH:mm")
      previousEventEndTime.add(sortedEventsWithWidth[i-1].duration, 'minutes')
      //console.log ("previousEventEndTime",previousEventEndTime)
      console.log ("eventStart",eventStart.isBefore(previousEventEndTime))

      if (eventStart.isBefore(previousEventEndTime)){
        sortedEventsWithWidth[i-1].cropFactor += 1
        sortedEventsWithWidth[i-1].leftFactor += 1
        sortedEventsWithWidth[i].cropFactor += sortedEventsWithWidth[i-1].cropFactor + 1
        sortedEventsWithWidth[i].leftFactor += sortedEventsWithWidth[i-1].leftFactor + 1
        console.log ("CROP !!!!!")
      }
    }
  }
  return (sortedEventsWithWidth)
}
