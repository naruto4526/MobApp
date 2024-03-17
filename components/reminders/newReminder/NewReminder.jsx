import React, {useState} from 'react';
import {ScrollView,Text, Button, View, TextInput,TouchableOpacity} from 'react-native';
import { saveEvent } from "../../../hook/saveEvent";
import {styles} from '../modal.styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNCalendarEvents from "react-native-calendar-events";
import { storage } from '../../../hook/useStore';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import { SIZES } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateMedObj, createMedObj, deleteMedObj } from '../../../src/graphql/mutations';
import { updateDate, saveOrUpdate } from '../../symptoms/Modals/sympModal';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

//Fill the modal with data collecting options.
const week = ['M','T','W','T','F','S','S'];

const Delete = (hashObj) => {
  for(let eventId of hashObj.ids.split(',')) RNCalendarEvents.removeEvent(eventId);
  storage.delete(hashObj.hashCode);
  let hashes = storage.getString('hashes');
  hashes = hashes.split(',');
  hashes.splice(hashes.indexOf(hashObj.hashCode),1);
  hashes = hashes.join(',');
  storage.set('hashes',hashes);
}

const Day = ({index,days,setDays}) => {
  const [selected,setSelected] = useState((days.indexOf(index) != -1));
  return (
    <TouchableOpacity style = {[styles.button,{backgroundColor:(!selected)?'white':'#2196F3'}]} onPress={()=> {
      if(!selected) days.push(index);
      else days.splice(days.indexOf(index),1);
      setDays(days);
      setSelected(!selected);
      console.log(days);
    }}>
      <Text style = {{padding:2,color:(selected)?'white':'#2196F3',textAlign:'center'}}>{week[index]}</Text>
    </TouchableOpacity>
  )
}

const NewReminder = ({route,navigation}) => {
  let {hashObj} = route.params;
  console.log(hashObj);
  if(hashObj) hashObj = JSON.parse(storage.getString(hashObj.hashCode));
  if(hashObj) console.log('hashObj.id ' + hashObj.id);
  const [days,setDays] = useState((hashObj && hashObj.days)?((hashObj.days).split(',')).map((item) => (parseInt(item))):[]);
  const [text,onChangeText] = useState(hashObj?hashObj.title:'');
  const [descriptionText,setDescriptionText] = useState(hashObj?hashObj.description:'')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time,setTime] = useState(hashObj?new Date(hashObj.time):(new Date()));  
  const [height, setHeight] = useState(0);
 
  return (
    
    <KeyboardAwareScrollView contentContainerStyle = {[styles.centeredView,styles.modalView]}>
      <View style = {styles.medication}>
        <Text style = {{padding:15, color:'white',fontFamily:"monospace",fontSize:SIZES.xLarge}}>Medication:</Text>
        <TextInput
          onChangeText={onChangeText}
          value = {text}
          style = {{ height: 40,margin: 12,padding: 10,flex:1,backgroundColor:'white'}}
        />
      </View>
      <View style = {{flex:4, marginTop:20}}>
        <View style = {{flexDirection:'row'}}>
          {week.map((item,index) => {
            return(<Day index = {index} days = {days} handlePress = {()=>{}} key = {index} setDays = {setDays}/>)
          })}
        </View>
        <View style = {{flexDirection:'row',marginTop:20,margin:10,alignItems:'center'}}>

            <View style = {{flex:1}}>
              <Button title="Change Time" onPress={() => {setDatePickerVisibility(true);}}/>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={(date) => {
                  
                  setDatePickerVisibility(false);
                  const realTime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours() + 5,date.getMinutes() + 30, date.getSeconds())
                  console.warn('time picked is ' + realTime.toISOString());
                  setTime(realTime);
                  
              }}
                onCancel={() => {setDatePickerVisibility(false);}}
              />
            </View>
            <View style = {{margin:5,flex:1}}>
              <Text style = {{textAlign:'center',fontSize:25}}>{time.toUTCString().slice(-12,-3)}</Text>
            </View>
      
        </View>
        <View style = {{flex:3,marginTop:10,}}>
          <Text style = {{marginTop:10,padding:10, fontFamily:'monospace', fontSize:SIZES.large}}>Description:</Text>
          <TextInput
            onChangeText={setDescriptionText}
            value = {descriptionText}
            style = {{ height: Math.max(100, height),margin: 12,borderWidth: 0.5,padding: 10,flex:1}}
            multiline = {true}
            numberOfLines={10}
            textAlignVertical='top'
            onContentSizeChange={(event) =>
              setHeight(event.nativeEvent.contentSize.height)
            }
          />
        </View>
      </View>
     
      <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              //refill hashObj by collecting data from the modal before sending it to be saved.
              if(hashObj != null) {
                Delete(hashObj);
              }
              else hashObj = {}
              hashObj.ids = ""
              hashObj.title = text;
              hashObj.time = time;
              hashObj.days = days;
              hashObj.description = descriptionText;
              hashObj.hashCode = uuid()
              hashObj.userId = storage.getString('userId');
              
              saveEvent(hashObj).then( () => {
                saveOrUpdate(hashObj, updateMedObj, createMedObj).then((id) => {
                  hashObj.id = id;
                  console.log(hashObj);
                  storage.set(hashObj.hashCode, JSON.stringify(hashObj));
                  console.log('hashObj.id is ' + hashObj.id);
                  updateDate();
                }).catch((err) => {
                  console.log(err);
                })
                navigation.goBack();
              })
              }}>
            <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
        {
          //onPress will call a delete hook first.
          hashObj?(<TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {
            Delete(hashObj);
            try {
              console.log(hashObj);
              console.log('hashObj.id is ' + hashObj.id);
              if(hashObj.id) {
                await client.graphql({
                  query : deleteMedObj,
                  variables : {
                    input : {id :hashObj.id}
                  }
                });
              }
            } catch(err) {
              console.log(err);
            }
            updateDate();
            navigation.goBack();
            }}>
          <Text style={styles.textStyle}>Delete</Text>
          </TouchableOpacity>)
          :(<Text></Text>)
        }
        <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};



export {NewReminder};



//difference between creating and editing an existing event. For editing the events, all the existing events will need to be deleted first. And then, the hashCode of the current hashObj has to be removed from memory. Now, a hashObj with all the necessary information will be passed into the saveEvent function. It will be missing a hashCode however. Which can be generated and added in later.