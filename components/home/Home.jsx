import React from "react";
import {View, Text,TouchableOpacity} from 'react-native';
import styles from "./home.styles";
import {Card} from '../cards/card';

const data = ["Vitals","Reminders","Track Symptoms","Step Count","Settings","something"];

const Home = ({navigation}) => {

  return(
    <View style = {styles.cardsContainer}>
     
      {data.map((item,index) => (
          <Card title = {item} 
          key = {index} 
          handleNav = {()=>{navigation.navigate(`${item}`)}}
          />
      ))}
    </View>
  );
};

export {Home};