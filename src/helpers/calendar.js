import moment, { duration } from 'moment';



const calendarTotalDuration = (sortedEvents) => {
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

