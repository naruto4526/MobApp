import React from "react";
import {View,Text, FlatList,TouchableOpacity} from 'react-native';
import { styles } from "./tabular.styles";
import { COLORS } from "../../../constants";

const Item = ({item,type}) => {

  return (
  <View style = {styles.textContainer(type)}>
    <TouchableOpacity >
      <Text style = {styles.textVal(type)}>{item}</Text>
    </TouchableOpacity>
  </View>
  );
}

const Column = ({data, type}) => {
  return (
  <View style = {styles.column}>
    {data.map( (item,index) => 
      (<Item item = {item} key = {index} type = {type}/>)
    )}
  </View>
  );
}

const Tabular = ({data}) => {
  let Data = Object.entries(data);
  let usefulData = [];
  let temp = [];
  for(let arr of Data) temp.push(arr[0]);
  usefulData.push(temp);
  let index = 0;
  while(index < Data[0][1].length) {
    let temp = [];
    for(let arr of Data) {
      if(index < arr[1].length) temp.push(arr[1][index]);
    }
    index++;
    usefulData.push(temp);
  }
  
  return (
    <View style = {styles.container}>
      <View style = {{flex:1}}>
        <Column data = {usefulData[0]} type = "title" />
      </View>
      <View style = {{flex:3}}>
        <FlatList
          horizontal = {true}
          data = {usefulData.slice(1,-1)}
          renderItem = {({item})=> (<Column data = {item} type = "value" />)}
          inverted = {true}
          keyExtractor={({item,index}) => (index)}
        />
      </View>
      <View style = {{flex:1}}>
      <Column data = {usefulData.at(-1)} type = "units" />
      </View>
    </View>
  );

};

export {Tabular};