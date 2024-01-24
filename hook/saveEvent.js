import RNCalendarEvents from "react-native-calendar-events";
import { storage } from "./useStore";

//called from the popup. It takes id argument in case of updating an event, id is null in case of new event

const saveEvent = async (time, title, description,id) => {
  let val;
  try {
    val = await RNCalendarEvents.checkPermissions((readOnly = false))
    if(val !== "authorized") {
      val = await RNCalendarEvents.requestPermissions((readOnly = false));
    }
    if(val === "authorized")  {

      let date = new Date();
      let startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes() + 2, date.getSeconds(),date.getMilliseconds());
      let endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours() + 1,date.getMinutes() +2, date.getSeconds(),date.getMilliseconds());
      console.log(startDate.toString());

      //possible problems are recurrence, start and end time
      let newEventId = await RNCalendarEvents.saveEvent(title,
      {
        alarms:[{date:startDate.toISOString()}],
        calendarId:'5',
        startDate:time,
        endDate: time,
        description:description,
        recurrence:"daily"
      }
      );

      console.log(newEventId);
     
      let eventKeys = storage.getBuffer("keys");
      eventKeys.push(newEventId);
      storage.set("keys",eventKeys);
      
      const jsonEvent = {
        title:title,
        time:time,
      }
      storage.set( String.valueOf(newEventId),jsonEvent);
    }
  }
  catch(err) {
    console.log(err);
  }
  finally {
    console.log("button works");
    console.log(val);
  }
}

export {saveEvent};
