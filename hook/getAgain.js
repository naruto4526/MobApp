import { timeout } from "./timeout";
import { storage } from "./useStore";
import { createVitalObj, updateUser } from "../src/graphql/mutations";
import { generateClient } from 'aws-amplify/api';
import { updateDate } from "../components/symptoms/Modals/sympModal";
const client = generateClient();

const saveVitals = async (vitalObj) => {
  let response;
  const VitalObj = {...vitalObj}
  for(let key in VitalObj) {
    if(key === 'date') continue;
    VitalObj[key] = VitalObj[key].join(',');
  }
  VitalObj.userId = storage.getString('userId');
  console.log(VitalObj);
  try {
    response = await client.graphql({
      query : createVitalObj,
      variables : {
        input : VitalObj
      }
    })
  } catch(err) {
    console.log(err);
  } finally {
    console.log(response);
  }
}
const getAgain = (interval) => {
  timeout.clearAllTimeouts();
  doStuff(1).then(() => {
    doStuff2().then(() => {
    timeout.setTimeout(() => {getAgain(interval)}, interval);
    });
  }).catch((err) => {
    console.log('error is here' + err);
    //maybe make call to function again. Lets see.
  });
 
}

const doStuff = async (number) => {
  const response = await fetch(`https://api.thingspeak.com/channels/2125743/feeds.json?api_key=4L15DSU8CJBHK2UG&results=${number}`);
  const data = await response.json();
  
  for(let obj of data.feeds) {
    let dateTime = new Date(obj.created_at);
    let dateObj;
    const dateString = (dateTime.getFullYear()) + '-' + (dateTime.getMonth() < 9?'0':'') + (dateTime.getMonth() + 1) + '-' + (dateTime.getDate() < 10?'0':'') + dateTime.getDate();
    console.log(dateString);
    let info = {
      Hb:['g/dl'],
      RBC:['mcL'],
      Temp:['C'],
      SpO2:['%'],
      Hr:['bpm'],
      Date:[],
      Time:[],
      date : dateString
    }

    info.Hr.splice(-1,0,obj.field4==null?0:obj.field4);
    info.Hb.splice(-1,0,obj.field6==null?0:obj.field6.slice(0,5));
    info.RBC.splice(-1,0,obj.field7==null?0:obj.field7.slice(0,4));
    info.Temp.splice(-1,0,obj.field8==null?0:obj.field8);
    info.SpO2.splice(-1,0,obj.field5==null?0:obj.field5);
    info.Date.push(dateTime.getDate() + '/' + (dateTime.getMonth() + 1)+ '/' + (dateTime.getFullYear()-2000));
    const timeB = (dateTime.getHours()<10?'0':'') + dateTime.getHours() + ':' +(dateTime.getMinutes()<10?'0':'') +dateTime.getMinutes();
    info.Time.push(timeB);

    let dates = storage.getString('dates');
    if(dates && dates.includes(dateString) && storage.contains(dateString)) {
      dateObj = JSON.parse(storage.getString(dateString));
      if(dateObj.vitalObjList) {
        if(compareTimes(dateObj.vitalObjList.at(-1).Time[0], timeB)) {
          dateObj.vitalObjList.push(info);
          saveVitals(info);
        }
      }
      else {
        dateObj.vitalObjList = [info];
        saveVitals(info);
      }
    }
    else {
      dateObj = {
        vitalObjList : [info]
      }
      console.log(dateObj);
      if(!dates) {
        dates = dateString;
      }
      if(!dates.includes(dateString)) dates += ',' + dateString;
      storage.set('dates', dates);
      saveVitals(info);
      updateDate();
    }
    storage.set(dateString, JSON.stringify(dateObj));
  }
}

const doStuff2 = async () => {
  try {
    const response = await fetch(`https://api.thingspeak.com/channels/2248859/feeds.json?api_key=QXG4M1BJRUAIKNZL&results=1`);
    const data = await response.json();
    const stepCount = data.feeds[0].field2;
    const entryId = data.feeds[0].entry_id;
    const createdAt = data.feeds[0].created_at;
    const stepCountObj = {
      stepCount : stepCount,
      entryId : entryId,
      createdAt : createdAt
    }
    console.log("fetching step data");
    console.log(stepCountObj);
    if (storage.contains('stepCount')) {
      if (JSON.parse(storage.getString('stepCount')).entryId < entryId) {
        console.log('added1');
        storage.set('stepCount', JSON.stringify(stepCountObj));
      }
      else console.log('no new data');
    } else {
      console.log('added2');
      storage.set('stepCount', JSON.stringify(stepCountObj));
    }
  } catch (err) {
    console.log('error is here' + err);
  } 

}

const compareTimes = (timeA, timeB) => {
  console.log(timeA + ' ' + timeB);
  timeA = timeA.split(':');
  timeB = timeB.split(':');
  for(let index in timeA) {
    const tA = parseInt(timeA[index]);
    const tB = parseInt(timeB[index]);
    if(tA !== tB) return tA < tB;
  }
  return false;
}

export {getAgain};