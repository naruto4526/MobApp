import {Modal, Button, View,Text,FlatList,ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { storage } from "../../hook/useStore";
import { styles } from './symptoms.style';
import {Meds,VitalDetail,SymptomDetail}from '..';
import { SympModal } from './Modals/sympModal';
import { getData } from '../vitals/Vitals';
import { COLORS } from '../../constants';


const Symptoms = ({navigation}) => {
  const DisplayInformation = ({item}) => {
    console.log(item);
    if (item.type) {
      date = item.date;
      date = date.split('-');
      date.reverse();
      date = date.join('-');
      return (
      <View style = {styles.dateContainer}>
        <Text style = {styles.dateDate}>{date}</Text>
      </View>)
    }
    return (
      <View>
    {(!item.symptom) ?
      (<VitalDetail vitalObj = {item}/>):
      (<SymptomDetail sympObj={item} 
        setSympObj = {setSympObj}
        setSympModalVisible = {setSympModalVisible}
      />)
    }
    </View>)
  }
  const createFlatListData = () => {
    const compareDates = (dateA, dateB) => {
      dateA = dateA.split('-');
      dateB = dateB.split('-');
      for (let i = 0; i < 3; i++) {
        if (parseInt(dateA[i]) === parseInt(dateB[i])) continue;
        return parseInt(dateA[i]) - parseInt(dateB[i]);
      } 
      return 1;
    }
    const data = [];
    let dates = storage.getString('dates');
    if (!dates) {
      setFlatListData([]);
      return;
    }
    dates = dates.split(',');
    dates.sort(compareDates);
    //iterate through the dates array, append dates first then all the objects associated with the dates in order.
    for (let date of dates) {
      data.push({
        type : 'date',
        date : date
      });
      const dateObj = storage.getString(date) ? JSON.parse(storage.getString(date)): null;
      if (dateObj) {
        if (dateObj.vitalObjList) {
          for (let vitalObj of dateObj.vitalObjList) {
            data.push(vitalObj);
          }
        }
        if (dateObj.sympObjList) {
          for (let sympObj of dateObj.sympObjList) {
            data.push(sympObj);
          }
        }
      }
    }
    data.reverse();
    setFlatListData(data);
  }
  let date = new Date();
  let dateString = (date.getFullYear()) + '-' + ((date.getMonth() < 9)?'0':'') + (date.getMonth() + 1) + '-' + ((date.getDate() < 10)?'0':'') + date.getDate() ;
  //console.log(dateString);
  const [allDates, setAllDates] = useState(0);
  const [sympObj, setSympObj] = useState(null);
  const [sympObjList,setSympObjList] = useState(null);
  const [vitalObjList, setVitalObjList] = useState([]);
  const [selected, setSelected] = useState(dateString);
  const [sympModalVisible, setSympModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flatListData, setFlatListData] = useState([]);
  useEffect(() => {
    //get dates with info and check if current date has entries
    let dates = storage.getString('dates');
    if(dates && dates.includes(selected) && storage.getString(selected)) {
      let dateObj = JSON.parse(storage.getString(selected));
      if(dateObj.sympObjList)setSympObjList(dateObj.sympObjList);
      else setSympObjList([]);
      if(dateObj.vitalObjList) setVitalObjList(dateObj.vitalObjList);
      else setVitalObjList([]);
    }
    else {
      setVitalObjList([]);
      setSympObjList([]);
    }
  }, [sympModalVisible, selected])

  return (
    <View style = {{flex : 1}}>
      <View style = {styles.modePicker}>
        <TouchableOpacity style = {styles.picker(allDates == 0)} onPress={() => setAllDates(0)}>
          <Text style = {styles.pickerText(allDates == 0)}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.picker(allDates == 1)} onPress={() => {
          createFlatListData();
          setAllDates(1);
        }}>
          <Text style = {styles.pickerText(allDates == 1)}> All Symptoms</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={sympModalVisible}
        onRequestClose={() => {
          setSympModalVisible(!sympModalVisible);
        }}>
          <SympModal 
            setSympModalVisible = {setSympModalVisible} 
            sympObj={sympObj} 
            navigation={navigation}
            selected = {selected}
          />
      </Modal>
    {allDates === 0 ? (<View style = {styles.container}>
      <Calendar
        onDayPress={day => {
        //  console.log(day.dateString);
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, dotColor: 'orange'}
        }}
        maxDate = {dateString}
        />
      
      <ScrollView>
        <View>
          <View style = {{flex:1}}>
          {!loading?vitalObjList.map((vitalObj, index) => {
            console.log(vitalObj);
            return(<VitalDetail vitalObj = {vitalObj} key = {index}/>)
          }):<ActivityIndicator size = "large" colors = {COLORS.primary}/>}
          </View>
          <View style = {{flex :1, }}>
            {sympObjList?sympObjList.map((sympObj) => {
              return <SymptomDetail sympObj={sympObj} 
                setSympObj = {setSympObj}
                setSympModalVisible = {setSympModalVisible}
                key = {sympObj.symptom}
              />
            }):(<Text></Text>)}
            
          </View>
          <View style = {{flex:1,marginTop:150}}></View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress = {() => {
        setSympObj(null);
        setSympModalVisible(true);
      }} style = {styles.addButton}>
            <Text style = {styles.buttonText}>+</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress = {() => {
        //fetch data from cloud, manipulate the data, and add it to the dateObj vitals property.
        if(selected !== dateString) return;
        setLoading(true);
        getData(1).then((vitalObj) => {
          let newList = vitalObjList;
          newList.push(vitalObj);
          setVitalObjList(newList);
          let dateObj;
          if(!storage.getString(selected)) {
            dateObj = {
              vitalObjList : newList
            }
          } else {
            dateObj = JSON.parse(storage.getString(selected));
            dateObj.vitalObjList = newList;
          }
          if(!storage.getString('dates')) storage.set('dates', selected);
          else if(!storage.getString('dates').includes(selected)) {
            let dates = storage.getString('dates');
            dates += ',' + selected;
            storage.set('dates', dates);
          }
          console.log(dateObj);
          storage.set(selected, JSON.stringify(dateObj));
          setLoading(false);
        })
      }} style = {[styles.addButton,{left:20, backgroundColor:'#ff584d'}]}>
            <Text style = {styles.buttonText}>-</Text>
      </TouchableOpacity> */}

    </View>):(
      <View style = {styles.container}>
        <FlatList
          data = {flatListData}
          renderItem = {({item, index}) => (<DisplayInformation item = {item} key = {index}/>)}
          inverted = {true}
        />
      </View>
    )}
    </View>
  );
};

export {Symptoms};

//What do I need to do?
//  1. Understand and get modals in the symptom view.
//  2. Design the add symptom modal.  
//      => Symptom
//        => Severity
//        => Medications to choose from along with add medication option which takes you newReminder page
//        => Medication effictevess slider
//        => Notes
//  3. Save symptom feature and read it on the symptoms page.
//  4. Symptom lists.
//  5. Record Vitals button on the left. This will insert the vitals at the top.
//



//Object being stored has key as date in yyyy-mm-dd format
// The object associated with this key will look like: 
// date = {
//   sympObjList: [{
//      date : 'date',
//      symptom :'symptom',
//      sympSeverity:'No.',
//      medHashes:'hash1,hash2,hash3,hash4',
//      medPotency:'No.1,No.2,No.3,No.4',
//      notes : 'notes',
//   
// }, sympObj2, sympObj3 ]
// vitals: An array of vitals objects.

// all the dates at which a record has been made will be stored as csv under the 'dates' key.