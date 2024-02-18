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


const Column = ({data, type}) => {
  return (
  <View style = {styles.column}>
    {data.map( (item,index) => 
      (<Text style = {{textAlign:'center'}} key = {index}>{item}</Text>)
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
  //console.log(usefulData);


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
      <Column data = {usefulData.at(-1)} type = "title" />
      </View>
    </View>
  );

};

export {Tabular};