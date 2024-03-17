import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { storage } from '../../hook/useStore';
import {updateDate} from '../symptoms/Modals/sympModal'

const deleteKeys = () => {
  const  keys = storage.getAllKeys();
  console.log("Starts here");
  console.log('\n\n\n\n');
  if(keys.length != 0) {
    console.log(keys)
    for(let key of keys) {
      console.log(key + " : " + storage.getString(key));
      storage.delete(key);
    }
  }
  else console.log("All keys deleted");
  storage.set('savedBefore', 'true');
  storage.set('userId', 'b4e0fa4');
  storage.set('name', 'Shakthi');
  storage.set('role', 'Patient');
}
const StepCount = () => {
  //commented below is code that will delete all the keys.
  
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A time has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
      <Text>To be built</Text>
      <Button onPress={() => {deleteKeys()}} title = "delete stored data" />
    </View>
  );
};

export {StepCount};