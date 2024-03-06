import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import { styles } from './card.style';

function Card({title,image,handleNav,imgUrl}) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>{title}</Text>
    // </View>
    <TouchableOpacity style = {styles.container} onPress = {handleNav}>

        <TouchableOpacity style = {styles.logoContainer}>
          {imgUrl?<Image
            source = {imgUrl}
            resizeMode='contain'
            style = {styles.logoImage}
            />:<Text></Text>}
        </TouchableOpacity>

        <View style = {styles.textContainer}>
          <Text style = {styles.jobName} >{title}</Text>
        </View>
      </TouchableOpacity>


  );
}
export {Card}; //using names exports as they are easier to deal with.