import React,{useState} from "react";
import {View,Text,TouchableOpacity, Button} from 'react-native';
import { storage } from "../../hook/useStore";
import RNCalendarEvents from "react-native-calendar-events";
import { Popup } from "./modal";


//fetch keys from storage and then render a list of title time pairs. Onclick function is a popup which takes argument, the event id. Popup will display all the info using textInput.
//When the save button pressed, it calls saveEvent function with optional argument ID. 

//When create new event button is pressed, it opens up the popup without an argument Id, leaving all the fields empty. When saved, it calls saveEvent without the argument, creating a new event instead.

let data = storage.getBuffer("keys"); //won't work.. data is limited..
//data = data.map((item)=>JSON.parse(storage.get(item)));

//set recurrence to be weekly and create different events for even a single alarm

const Reminders = () => {
  storage.delete("data");
  return(
   <>
      <Text>{storage.contains('data')?storage.getString("data"):"Key data does not exist"}</Text>
    </>
  )
}

export {Reminders};


//design list items and popups.

