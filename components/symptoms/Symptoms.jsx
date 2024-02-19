import {Alert, Modal, Button, StyleSheet,View,Text,FlatList,ScrollView} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { storage } from "../../hook/useStore";
import { useIsFocused } from '@react-navigation/native';
import { styles } from './symptoms.style';
import {Meds,VitalDetail,SymptomDetail}from '..';
import { SympModal } from './Modals/sympModal';


const Symptoms = ({navigation}) => {
  let date = new Date();
  let dateString = (date.getFullYear()) + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate() ;
  const [sympObj,setSympObj] = useState(null);
  const [selected, setSelected] = useState(dateString);
  const [sympModalVisible, setSympModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    //get dates with info and check if current date has entries
    let dates = storage.getString('dates');
    if(dates && dates.includes(selected)) {
      setSympObj(JSON.parse(storage.getString(selected)));
    }

  }, [isFocused])

  return (

    <View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        maxDate = {dateString}
        />
      <Modal
        animationType="slide"
        transparent={false}
        visible={sympModalVisible}
        onRequestClose={() => {
          setSympModalVisible(!sympModalVisible);
        }}>
          <SympModal setSympModalVisible = {setSympModalVisible} sympObj={sympObj} navigation={navigation}/>
      </Modal>
      <ScrollView>
        
        <View>
          {
          //vitals here if available
        }
          <VitalDetail/>
          <View>
            {
              //use a .map to put out all of the symptoms.
            }
            <SymptomDetail/>
            <Button onPress = {() => setSympModalVisible(true)} title='Show Modal'/>
          </View>
        </View>
      </ScrollView>
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