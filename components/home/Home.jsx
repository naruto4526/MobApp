import React from "react";
import {View, Text,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./home.styles";
import {Card} from '../cards/card';

const data = ["Vitals","Reminders","Track Symptoms","Step Count","Resources", "Settings"];
const imageMap = new Map();
imageMap.set('Vitals',require('../../assets/vitals.png'));
imageMap.set('Settings', require('../../assets/settings.jpg'));
imageMap.set('Reminders', require('../../assets/reminders.webp'));
imageMap.set('Track Symptoms', require('../../assets/symptoms.png'));
imageMap.set('Step Count', require('../../assets/Step_Count.png'));
imageMap.set('Resources', require('../../assets/resources.jpg'));
const Home = ({navigation}) => {

  return(
    <ScrollView contentContainerStyle = {styles.cardsContainer}>
     
      {data.map((item,index) => (
          <Card title = {item} 
          key = {index} 
          handleNav = {()=>{navigation.navigate(`${item}`)}}
          imgUrl = {imageMap.has(item)?imageMap.get(item):''}
          />
      ))}
    </ScrollView>
  );
};

export {Home};