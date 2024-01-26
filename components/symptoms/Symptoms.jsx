import React from 'react';
import {View,Text} from 'react-native';
import { storage } from '../../hook/useStore';


const Symptoms = () => {
  //Commented below is the key deleting code.
  const  keys = storage.getAllKeys();
  if(keys.length != 0) {
    console.log(keys)
    for(let key of keys) {
      console.log(key + " : " + storage.getString(key));
      storage.delete(key);
    }
  }
  else console.log("All keys deleted");
  
  return (
    <View>
    <Text>
      Hello from Symptoms
    </Text>
  </View>
  )
}

export {Symptoms};