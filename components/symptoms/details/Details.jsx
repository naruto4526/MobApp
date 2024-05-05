import { TouchableOpacity,View,Text } from "react-native";
import React, {useState} from 'react';
import { styles } from "./details.styles";
import { SIZES } from "../../../constants";
import { storage } from "../../../hook/useStore";

const MedItem = ({title,handlePress,type}) => {
  return (
    <TouchableOpacity onPress={handlePress} style = {styles.medButton(type)}>
    <Text style = {{color:type == 'notSelected'?'#2196F3':type == 'selected'?'#0079d9':'white',fontWeight:800}}>{title}</Text>
    </TouchableOpacity>
  )
}

const Meds = ({medNames, navigation, selectedMap, selectedMed,setSelectedMed,setSelectedMap,setSympModalVisible, addItem, allowPress}) => {
  //checks inside the map to see if current med is a part of the selectedArray, or is currentlySelected.
  return (
    <View style = {{flexDirection:'row',flexWrap:'wrap', width:320}}>
      {medNames?.map((item,index) => {
        return (
          <MedItem key = {index} 
          title = {item.title} 
          type = {(selectedMed === item.title)?'selected':(selectedMap.has(item.title)?'inMap':'notSelected')}
          handlePress = {() => {
            if(allowPress) {
              let newMap = new Map(selectedMap);
              if(selectedMed == item.title) {
                setSelectedMed('');
                newMap.delete(item.title);
              }
              else {
                setSelectedMed(item.title);
                newMap.set(item.title,selectedMap.get(item.title)??0);
              }
              setSelectedMap(newMap);
              // console.log(selectedMap);
            }
          }
        }/>
        )
      })}
      {addItem?<MedItem 
        type = 'notSelected'
        title = 'Add Medication..' 
        handlePress = {() => {
          setSympModalVisible(false);
        navigation.navigate('NewReminder',{
          hashObj : null,
        })
      }} />:(<Text></Text>)}
    </View>
  );
}



const VitalDetail = ({vitalObj}) => {
  let vitalValuePairs = [];
  const keysToBeFixed = ['Date', 'Hb', 'Hr', 'RBC', 'SpO2', 'Temp', 'Time'];
  for(const key in vitalObj) {
    let temp = [key, vitalObj[key]];
    if (!keysToBeFixed.includes(key)) continue;
    if(key === 'Date' || key === 'Time' || key === 'date')continue;
    vitalValuePairs.push(temp);
  }
  return(
    <View style = {{margin:10,marginBottom:0,flexDirection:'row',flexWrap:'wrap', borderWidth:2,borderRadius:7,borderColor:'#ff584d', padding:7, backgroundColor:'white'}}>
      {vitalValuePairs?.map((vital) => {
        return(
          <View style = {styles.vitalText} key = {vital[0]}>
          <Text>{vital[0] + ' : '}</Text>
          <Text>{vital[1][0]}</Text>
          <Text>{' ' + vital[1][1]}</Text>
          </View>
        )
      })}
      <View style = {styles.vitalText}>
        <Text>Time : </Text>
        <Text>{vitalObj.Time[0]}</Text>
      </View>
    </View>
  );
};


const SymptomDetail = ({sympObj, setSympObj, setSympModalVisible}) => {
  let medNames = [];
  let symptom = '';
  if(sympObj) {
    symptom = sympObj.symptom;
    let medHashes = sympObj.medHashes;
    medNames = medHashes.split(',');
    if(medNames.length == 1 && medNames[0] === '') medNames = [];
    // console.log(medNames);
  }
  return (
    <View style = {{margin:10,backgroundColor:'#2196F3',borderRadius:7, padding:10,paddingLeft:20,paddingRight:20,marginBottom:0,}}>
      <TouchableOpacity  onPress={() => {
        setSympObj(sympObj);
        setSympModalVisible(true);
      }}>
        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style = {styles.sympText}>{sympObj.symptom}</Text>
        <Text style = {styles.sympText}>{sympObj.sympSeverity}</Text>
        </View>
        {/* <<Meds medNames={medNames} selectedMed = {''} selectedMap={new Map()} allowPress={false}/>> */}
        <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
          {medNames?.map((med) => {
            return(
              <TouchableOpacity style = {[styles.medButton('notSelected'),{elevation:2}]} key = {med}>
                 <Text style = {{color:'#2196F3'}}>{med}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {Meds,VitalDetail,SymptomDetail};