import React, {useEffect} from "react";
import {View, Text,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./home.styles";
import {Card} from '../cards/card';
import { getAgain } from '../../hook/getAgain';
import { timeout } from '../../hook/timeout';

const data = ["Vitals","Reminders","Track Symptoms","Step Count", "Notes", "Settings", "Debug"];
const imageMap = new Map();
imageMap.set('Vitals',require('../../assets/vitals.png'));
imageMap.set('Settings', require('../../assets/settings.jpg'));
imageMap.set('Reminders', require('../../assets/reminders.webp'));
imageMap.set('Track Symptoms', require('../../assets/symptoms.png'));
imageMap.set('Step Count', require('../../assets/Step_Count.png'));
imageMap.set('Resources', require('../../assets/resources.jpg'));
imageMap.set('Notes', require('../../assets/notes.jpg'));
const Home = ({navigation}) => {
  // useEffect(() => {
  //   console.log("New call hereeee");
  //   console.log();
  //   getAgain(3000);
  // }, []);
  
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