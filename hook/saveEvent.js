import RNCalendarEvents from "react-native-calendar-events";
import { storage } from "./useStore";
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

//called from the popup. It takes id argument in case of updating an event, id is null in case of new event

const saveEvent = async (hashObj) => {
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
      //when no hashcode provided, new event is created
      
      if(hashObj == null) {

        let newEventId = await RNCalendarEvents.saveEvent('pls',
        {
          alarms:[{"date":startDate.toISOString()}],
          calendarId:'5',
          startDate:startDate.toISOString(),
          endDate: endDate.toISOString(),
          description:'Is this what life is?',
  
        }
        );
        console.log("New event created" + ":" + newEventId);
        let hashCode = uuid();
        let eventHashes = storage.getString('hashes');
        if(eventHashes == null) eventHashes = hashCode;
        else eventHashes += "," + hashCode;

        storage.set('hashes',eventHashes);
        
        const jsonEvent = {
          hashCode:hashCode,
          ids:newEventId,
          title: 'This should ring',
          description:'Hello there',
          days:'',
          time:startDate.getTime(),
        }
        storage.set(hashCode,JSON.stringify(jsonEvent));
      }
      //Old event is edited.
      else {
        let eventObj = hashObj;
        let events = eventObj.ids.split(',');
        for(let event of events) RNCalendarEvents.removeEvent(event);
        storage.delete(hashObj.hashCode);
        //create new events. One event for each day of the week.

      }
    }
  }
  catch(err) {
    console.log(err);
  }

}

export {saveEvent};
