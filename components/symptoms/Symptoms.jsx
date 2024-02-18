import {View,Text,FlatList,ScrollView} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { storage } from "../../hook/useStore";
import { useIsFocused } from '@react-navigation/native';
import { styles } from './symptoms.style';

const SymptomTemplate = () => {
  return (
    <Text>Hello there</Text>
  );
};

const Symptoms = () => {
  let date = new Date();
  console.log(date.toUTCString() + ',' + date.getMonth());
  let dateString = (date.getFullYear()) + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate() ;
  const [data,setData] = useState(null);
  const [selected, setSelected] = useState(dateString);
  const isFocused = useIsFocused();

  useEffect(() => {
    //get data from local storage.
    let dates = storage.getString('dates');
    if(dates && dates.includes(selected)) setData(storage.getString(selected));

  }, [isFocused])

  return (
    <ScrollView>
      <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      maxDate = {dateString}
      />
      <View>
        {
        //vitals here if available
      }
        <View>
          {
            //use a map to put out all of the symptoms.
          }
        </View>
      </View>
    </ScrollView>
  );
};

export {Symptoms};

//What do I need to do?
//  1. Disable future dates on calendar
//  2. ScrollView for the whole thing.
//  3. Add symptom modal
//      => Symptom
//        => Severity
//        => Medications to choose from along with add medication option which takes you newReminder page
//        => Medication effictevess slider
//        => Notes
//  4. Record Vitals button on the left. This will insert the vitals at the top.
//



//Object being stored has key as date in yyyy-mm-dd format
// The object associated with this key will look like: 
// {
//   date : 'date',
//   symptom :'symptom',
//   symptomSeverity:'No.',
//   medHashes:'hash1,hash2,hash3,hash4',
//   medPotency:'No.1,No.2,No.3,No.4',
//   notes : 'notes',
//   vitals: 'Hb,val|RBC,val|Hr,val| 
// }

// all the dates at which a record has been made will be stored as csv under the 'dates' key.