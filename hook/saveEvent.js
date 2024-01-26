import RNCalendarEvents from "react-native-calendar-events";
import { storage } from "./useStore";

const saveEvent = async (hashObj) => {
  let val;
  try {
    val = await RNCalendarEvents.checkPermissions((readOnly = false))
    if(val !== "authorized") {
      val = await RNCalendarEvents.requestPermissions((readOnly = false));
    }
    if(val === "authorized")  {

      let date = hashObj.time;
      console.log(date.toString());
      const dayIndex = new Map([['Mon',0], ['Tue',1], ['Wed',2],['Thu',3],['Fri',4],['Sat',5],['Sun',6]]);

      for(let day of hashObj.days) {
        //create event for each day and make them repeat weekly.
        // To convert day of the week into delta with today.
        const delta = day - dayIndex.get(date.toUTCString().slice(0,3));
        let startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() + delta,date.getHours(),date.getMinutes(), date.getSeconds(),date.getMilliseconds());
        let endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() + delta,date.getHours() + 1,date.getMinutes(), date.getSeconds(),date.getMilliseconds());
        let newEventId = await RNCalendarEvents.saveEvent(hashObj.title,
        {
          alarms:[{"date":startDate.toISOString()}],
          calendarId:'5',
          startDate:startDate.toISOString(),
          endDate: endDate.toISOString(),
          description:hashObj.description,
          recurrence:'weekly',
        });
        console.log("Event created : " + newEventId);
        hashObj.ids += (hashObj.ids == "")?newEventId:("," + newEventId);
      }
      
      let eventHashes = storage.getString('hashes');
      if(eventHashes == null) eventHashes = hashObj.hashCode;
      else eventHashes += "," + hashObj.hashCode;
      hashObj.days = hashObj.days.join(',');
      storage.set('hashes',eventHashes);
      storage.set(hashObj.hashCode,JSON.stringify(hashObj));
    
    }
  }
  catch(err) {
    console.log(err);
  }
}

export {saveEvent};
