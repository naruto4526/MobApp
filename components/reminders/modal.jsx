import React, {useState} from 'react';
import {Text, Button,Pressable, View, ScrollView, TextInput,FlatList, TouchableOpacity} from 'react-native';
import { saveEvent } from "../../hook/saveEvent";
import {styles} from './modal.styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";

//Fill the modal with data collecting options.
const week = ['M','T','W','T','F','S','S'];

const Day = ({index,days,setDays}) => {
  const [selected,setSelected] = useState(false);
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

const Popup = ({setModalVisible,onSave,hashObj}) => {
  
  const [days,setDays] = useState(hashObj?hashObj.days.split(','):[]);
  const [text,onChangeText] = useState(hashObj?hashObj.title:'');
  const [descriptionText,setDescriptionText] = useState(hashObj?hashObj.description:'')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time,setTime] = useState(hashObj?hashObj.time:(new Date()));  
  const [height, setHeight] = useState(0);
 
  return (
    <View style = {[styles.centeredView,styles.modalView]}>
      <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
      <Text style = {{padding:5}}>Medication:</Text>
      <TextInput
        onChangeText={onChangeText}
        value = {text}
        style = {{ height: 40,margin: 12,borderWidth: 0.5,padding: 10,flex:1}}
      />
      </View>
      <View style = {{marginTop:20,alignItems:'center'}}>
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
                  console.warn('time picked is ' + date.toISOString());
                  setDatePickerVisibility(false);
                  const realTime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours() + 5,date.getMinutes() + 30, date.getSeconds())
                  setTime(realTime);
                  
              }}
                onCancel={() => {setDatePickerVisibility(false);}}
              />
            </View>
            <View style = {{margin:5,flex:1}}>
              <Text style = {{textAlign:'center',fontSize:25}}>{time.toUTCString().slice(-12,-3)}</Text>
            </View>
      
        </View>
        <View style = {{marginTop:10,flexDirection:'row',justifyContent:'space-evenly'}}>
        <Text style = {{marginTop:10,padding:5}}>Description:</Text>
        <TextInput
          onChangeText={setDescriptionText}
          value = {descriptionText}
          style = {{ height: Math.max(35, height),margin: 12,borderWidth: 0.5,padding: 10,flex:1}}
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
                  saveEvent(hashObj).then( () => {
                    onSave();
                    setModalVisible(false);
                  })
                  }}>
                <Text style={styles.textStyle}>Save</Text>
      </TouchableOpacity>
      {
        //onPress will call a delete hook first.
        hashObj?(<TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(false)}>
        <Text style={styles.textStyle}>Delete</Text>
</TouchableOpacity>):(<Text></Text>)
      }
       <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};



export {Popup};