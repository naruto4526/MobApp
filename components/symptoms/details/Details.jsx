import { TouchableOpacity,View,Text } from "react-native";
import React, {useState} from 'react';

const MedItem = ({title,handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style = {{margin:7,padding:7,borderColor:'#2196F3',
    borderWidth:2,borderRadius:10}}>
      <Text style = {{color:'#2196F3',fontWeight:700}}>{title}</Text>
    </TouchableOpacity>
  )
}

const Meds = ({medNames, handlePress, navigation, selectedArray, currentlySelected,setSelectedArray,setSympModalVisible}) => {
  //checks inside the map to see if current med is a part of the selectedArray, or is currentlySelected.
  return (
    <View style = {{flexDirection:'row',flexWrap:'wrap', width:320}}>
      {medNames?.map((item,index) => {
        return (
          <MedItem key = {index} title = {item.title} handlePress = {handlePress}/>
        )
      })}
      <MedItem title = '+' handlePress = {() => {
        setSympModalVisible(false);
        navigation.navigate('NewReminder',{
          hashObj : null,
        })
      }} />
    </View>
  );
}

const VitalDetail = ({vitalString}) => {
  return(
    <View>
      <Text>vitalDetail</Text>
    </View>
  );
};


const SymptomDetail = ({sympObj}) => {
  // const symptom = sympObj.symptom;
  // const medHashes = sympObj.medHashes;
  let medNames = [1,2,3];
  // medHashes = medHashes.split(',');
  // for (const hash of medHashes) {
  //   let medObj = JSON.parse(storage.getString(hash));
  //   medNames.push(medObj.title);
  // }
  return (
    <View>
      <Text>SymptomDetail</Text>
      <Meds medNames={medNames}/>
    </View>
  );
};

export {Meds,VitalDetail,SymptomDetail};