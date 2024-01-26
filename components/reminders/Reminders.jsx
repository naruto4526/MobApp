import React,{useEffect, useState} from "react";
import {View,Text,TouchableOpacity, Button, FlatList} from 'react-native';
import { storage } from "../../hook/useStore";
import RNCalendarEvents from "react-native-calendar-events";
import { Popup } from "./modal";
import { styles } from "./reminders.styles";

const Item = ({item}) => {
  return (
    <View style = {styles.container}>
    <TouchableOpacity style = {styles.textContainer}>
      <Text style = {styles.text}>{item.title}</Text>
    </TouchableOpacity>
  </View>
  );
};

//fetch keys from storage and then render a list of title time pairs. Onclick function is a popup which takes argument, the event id. Popup will display all the info using textInput.
//When the save button pressed, it calls saveEvent function with optional argument ID. 

//When create new event button is pressed, it opens up the popup without an argument Id, leaving all the fields empty. When saved, it calls saveEvent without the argument, creating a new event instead.


//set recurrence to be weekly and create different events for even a single alarm

const Reminders = () => {
  const [data,setData] = useState(0);
  useEffect( () => {
    let data = storage.getString('keys'); 
    data = data.split(',');
    data = data.map(item => JSON.parse(storage.getString(item)));
    setData(data);
  },[]);
  
  return(
   <View >
    {data?(
      <FlatList
      data = {data}
      renderItem={({item}) => (
        <Item item = {item}/>
      )}
      keyExtractor={(item) => item}
      />
    ):<Text>No data yet</Text>
    }
   </View>
  )
}

export {Reminders};


//design list items and popups.

