import { storage } from "./useStore";
import { listUsers, listSympObjs, listMedObjs, listVitalObjs } from "../src/graphql/queries";
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const deleteKeys = () => {
  const  keys = storage.getAllKeys();
  const skipArray = ['patientList', 'savedBefore', 'role', 'name', 'userId'];
  if(keys.length != 0) {
    console.log(keys);
    for(let key of keys) {
      console.log(key + " : " + storage.getString(key));
      if (skipArray.includes(key)) continue;
      else storage.delete(key);
    }
  }
  console.log("All keys deleted");
}

const fetchList = async (query, patientId) => {
  let response;
  const filter = {
    userId : {
      eq : patientId
    }
  };
  try {
    response = client.graphql({
      query : query,
      variables : {
        filter : filter
      }
    })
  } catch (err) {
    console.log(err);
  } finally {
    return response;
  }
}

const saveThisShit = (user, sympObjList, medObjList, vitalObjList) => {
  storage.set('dates', user.dates);
  storage.set('hashes', user.hashes);
  storage.set('patientId', user.userId);
  const dateArray = user.dates.split(',');
  const hashesArray = user.dates.split(',');
  const parentObj = {};
  for (let key of dateArray) parentObj[key] = {};
  for (let key of hashesArray) parentObj[key] = {};
  for(let sympObj of sympObjList) {
    if (parentObj[sympObj.date].sympObjList) parentObj[sympObj.date].sympObjList.push(sympObj);
    else parentObj[sympObj.date].sympObjList = [sympObj];
  }
  for(let vitalObj of vitalObjList) {
    if (parentObj[vitalObj.date].vitalObjList) parentObj[vitalObj.date].vitalObjList.push(vitalObj);
    else parentObj[vitalObj.date].vitalObjList = [vitalObj];
  }
  for(let medObj of medObjList) parentObj[medObj.hashCode] = medObj;
  for(let key in parentObj) {
    storage.set(key, JSON.stringify(parentObj[key]));
  }
  console.log('fetched and saved new data');
}

const savePatientData = (patientId) => {
  let user,sympObjList,medObjList,vitalObjList;

  fetchList(listUsers, patientId).then((response) => {
    user = (response?.data?.listUsers?.items[0]);
    fetchList(listSympObjs, patientId).then((response) => {
      sympObjList = (response?.data?.listSympObjs?.items);
      fetchList(listMedObjs, patientId).then((response) => {
        medObjList = (response?.data?.listMedObjs?.items);
        fetchList(listVitalObjs, patientId).then((response) => {
          vitalObjList = (response?.data?.listVitalObjs?.items);
          deleteKeys();
          saveThisShit(user, sympObjList, medObjList, vitalObjList);
        })
      })
    })
  }).catch((err) => console.log(err));
}

export {savePatientData};