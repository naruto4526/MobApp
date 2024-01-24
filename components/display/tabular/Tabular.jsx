import React from "react";
import {View,Text, FlatList,TouchableOpacity} from 'react-native';
import { styles } from "./tabular.styles";

const Item = ({item}) => {

  return (
  <View style = {styles.textContainer}>
    <TouchableOpacity >
      <Text style = {styles.textVal}>{item}</Text>
    </TouchableOpacity>
  </View>
  );
}

const Elem = ({entry,units}) => {

  return(
    <View style = {styles.rowContainer}>
    <View style = {{flex:1.3}}>
      <TouchableOpacity style = {styles.paramContainer}>
        <Text style = {styles.paramText}>{entry[0]}</Text>
      </TouchableOpacity>
    </View>
    <View style = {{flex:4}}>
      <FlatList
            data = {[...entry[1].slice(0,-1)]}
            renderItem={({item}) => <Item item = {item}/>}
            horizontal = {true}
            keyExtractor={(item,index) => index}
            showsHorizontalScrollIndicator = {false}
            inverted = {true}
        />
    </View>
    <View style = {{flex:1}}>
      <TouchableOpacity>
      <Text>{units}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};


const Tabular = ({data}) => {
  return(
    <View style = {styles.container}>
      {Object.entries(data).map((entry,index) => {
       
        return (<Elem entry = {[...entry]} key = {index} units = {entry[1].at(-1)}/>)
      })
    }
    </View>
  );
};

export {Tabular};