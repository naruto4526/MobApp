import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import { getAgain } from '../../hook/getAgain';
import { timeout } from '../../hook/timeout';

const deleteKeys = () => {
  const  keys = storage.getAllKeys();
  console.log("Starts here");
  console.log('\n\n\n\n');
  if(keys.length != 0) {
    console.log(keys)
    for(let key of keys) {
      console.log(key + " : " + storage.getString(key));
     // storage.delete(key);
    }
  }
  else console.log("All keys deleted");
  storage.set('savedBefore', 'true');
  storage.set('userId', 'b4e0fa4');
  storage.set('name', 'Shakthi');
  storage.set('role', 'Patient');
}

const Resources = () => {
  useEffect(() => {
    console.log("New call hereeee");
    console.log();
    getAgain(3000);
  }, []);
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>to be built</Text>
      <Button title = "delete events" onPress = {() => {timeout.clearAllTimeouts()}} />
      <Button onPress={() => {deleteKeys()}} title = "delete stored data" />
    </View>
  );
};

export {Resources};