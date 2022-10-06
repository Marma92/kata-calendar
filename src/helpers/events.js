import moment from 'moment';


export const sortEventsByEndingLatest = (events) => {
  events.sort((a, b) => (a.duration < b.duration ? 1 : -1))
  events.sort((a, b) => (moment(a.start,  "HH:mm").isAfter(moment (b.start, "HH:mm"))  ? 1 : -1))
  return events
}

export const computeEventTop = (event, scheduleOpening, globalProportions) => {
  const start = new moment(event.start, "HH:mm")
  const opening = new moment(scheduleOpening, "HH:mm")

  const duration = start.diff(opening)

  let eventTop = parseInt(moment.utc(duration).format("HH"))
  eventTop += parseInt(moment.utc(duration).format("mm"))/60
  eventTop *= globalProportions

  return eventTop
}

const isOverLapping = (event1, event2) => {
  const event1Start = parseInt(new moment(event1.start, "HH:mm").format('X'))
  const event2Start = parseInt(new moment(event2.start, "HH:mm").format('X'))

  const event1End = event1Start + event1.duration*60
  const event2End = event2Start + event2.duration*60

  if (
    (event1Start < event2End && event1Start >= event2Start) ||
    (event1End > event2Start && event1End <= event2End) ||
    (event1End >= event2End && event1Start <= event2Start)
  ) {
    return true
  }
  return false
}

const getOverlappingEvents  = (events, currentEventIndex) => {
  let overlappingEvents = []
  for (let i = 0; i < events.length; i++) {
    if (i !== currentEventIndex && isOverLapping(events[currentEventIndex], events[i])) {
      overlappingEvents.push(i)
    }
  }
  return overlappingEvents
}

const computeEventsWidth = (events, currentEventIndex) => {
  let width = events[currentEventIndex].overlappingEvents.length +1
  if (
    events[currentEventIndex].overlappingEvents.length &&
    events[events[currentEventIndex].overlappingEvents[0]].overlappingEvents
  ) {
    width = events[events[currentEventIndex].overlappingEvents[0]].width
  } else
    for (let i = 0; i < events[currentEventIndex].overlappingEvents.length; i++) {
      if (
        i < events[currentEventIndex].overlappingEvents.length - 1 &&
        !isOverLapping(
          events[events[currentEventIndex].overlappingEvents[i]],
          events[events[currentEventIndex].overlappingEvents[i + 1]],
        )
      ) {
        width--
      }
    }
  return width
}

const computeEventPosition = (events, currentEventIndex) => {
  let position = 0
  for (let i = 0; i < events[currentEventIndex].overlappingEvents.length; i++) {
    if ( typeof(events[events[currentEventIndex].overlappingEvents[i]].position) !== 'undefined' &&
      events[events[currentEventIndex].overlappingEvents[i]].position < events[currentEventIndex].width-1 &&
      events[currentEventIndex].overlappingEvents[i] < currentEventIndex
    ) {
      position++
    }
  }
  return position
}

const computeWidthRatio = (events, currentEventIndex) => {
  let widthRatio = 1
  if (events[currentEventIndex].overlappingEvents.length < events[currentEventIndex].width - 1) {
    widthRatio = events[currentEventIndex].width - events[currentEventIndex].overlappingEvents.length
  }
  return widthRatio
}

export const agrementEventsData = (events) =>{
  events.forEach((event, index) => {
    event.overlappingEvents = getOverlappingEvents(events, index)
    event.width = computeEventsWidth(events, index)
    event.position = computeEventPosition(events, index)
    event.widthRatio = computeWidthRatio(events, index)
  });
  return events
}