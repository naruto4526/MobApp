import React,{useEffect, useState} from "react";
import {Alert,Modal,Pressable,View,Text,TouchableOpacity, Button, FlatList} from 'react-native';
import { storage } from "../../hook/useStore";
import { Popup } from "./modal";
import { styles } from "./reminders.styles";

const Item = ({item,handlePress}) => {
  return (
    <View style = {styles.container}>
    <TouchableOpacity style = {styles.textContainer} onPress={handlePress}>
      <Text style = {styles.text}>{item.title}</Text>
    </TouchableOpacity>
  </View>
  );
};

const Reminders = () => {
  const [data,setData] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpened,setModalOpened] = useState(0);
  const [hashObj,setHashObj] = useState(null);

  useEffect( () => {
    let data = storage.getString('hashes'); 
    if(data != null) {
      data = data.split(',');
      data = data.map(item => JSON.parse(storage.getString(item)));
    }
    setData(data);
  },[modalOpened]);
  
  return(
   <View style = {{flex:1}}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

          <Popup setModalVisible={setModalVisible}  onSave = {() => {setModalOpened(modalOpened + 1)}} hashObj = {hashObj}/>

    </Modal>
    <View style = {{flex:10}}>
      {(!modalVisible) && data != null?(
        <FlatList
          data = {data}
          renderItem={({item}) => (<Item item = {item} handlePress = {() => {
            setHashObj(item);
            setModalVisible(true)}}/>)}
          keyExtractor={(item) => item}
        />
      ):<Text></Text>}
    </View>
    {(!modalVisible)?(<View style = {{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Button onPress={() => {
          setHashObj(null);
          setModalVisible(true)}} title="Add" />
    </View>):(<Text></Text>)}
   </View>
  )
}

export {Reminders};


//Event JSON Object associated with the key is: 
// {
// hashCode:
// key:
// title:
// description:
// days: 'M,T,W'
// time: 
// }
//fetch keys from storage and then render a list of title time pairs. Onclick function is a popup which takes argument, the event id. Popup will display all the info using textInput.
//When the save button pressed, it calls saveEvent function with optional argument ID. 

//When create new event button is pressed, it opens up the popup without an argument Id, leaving all the fields empty. When saved, it calls saveEvent without the argument, creating a new event instead.

//set recurrence to be weekly and create different events for even a single alarm

