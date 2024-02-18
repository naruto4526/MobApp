import React,{useEffect, useState} from "react";
import {View,Text,TouchableOpacity, Button, FlatList} from 'react-native';
import { storage } from "../../hook/useStore";
import { styles } from "./reminders.styles";
import { useIsFocused } from '@react-navigation/native';

const Item = ({item,handlePress}) => {
  return (
    <View style = {styles.container}>
    <TouchableOpacity style = {styles.textContainer} onPress={handlePress}>
      <Text style = {styles.text}>{item.title}</Text>
    </TouchableOpacity>
  </View>
  );
};

const Reminders = ({navigation}) => {
  const [data,setData] = useState(0);
  const isFocused = useIsFocused();
  
  useEffect( () => {
    let data = storage.getString('hashes'); 
    if(data != null) {
      data = data.split(',');
      data = data.map(item => JSON.parse(storage.getString(item)));
    }
    setData(data);
  },[isFocused]);
  
  return(
  <View style = {{flex:1}}>
    <View style = {{flex:10}}>
      {data != null?(
        <FlatList
          data = {data}
          renderItem={({item}) => (<Item item = {item} handlePress = {() => {
            navigation.navigate('NewReminder', {
              hashObj : item,
            })
          }}/>)}
          keyExtractor={(item) => item.title}
        />
      ):<Text></Text>}
    </View>
    <View style = {{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Button onPress={() => {
          navigation.navigate('NewReminder', {
            hashObj : null,
          })
          }} title="Add" />
    </View>
  </View>
  )
}

export {Reminders};


//Event JSON Object associated with the key is: 
// {
// hashCode:
// ids:
// title:
// description:
// days: '1,2,3,4'
// time: 
// }
//fetch keys from storage and then render a list of title time pairs. Onclick function is a popup which takes argument, the event id. Popup will display all the info using textInput.
//When the save button pressed, it calls saveEvent function with optional argument ID. 

//When create new event button is pressed, it opens up the popup without an argument Id, leaving all the fields empty. When saved, it calls saveEvent without the argument, creating a new event instead.

//set recurrence to be weekly and create different events for even a single alarm

